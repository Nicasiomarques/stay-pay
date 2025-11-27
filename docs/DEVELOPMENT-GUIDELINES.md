# StayGo - Development Guidelines

Guia completo de boas práticas e padrões de desenvolvimento para a equipa StayGo.

**Stack:** React Native 0.81 | Expo SDK 54 | TypeScript 5.8 | NativeWind 4.x | React Query 5.x

---

## Índice

1. [React Native & Expo](#1-react-native--expo)
2. [State Management](#2-state-management)
3. [React Query](#3-react-query)
4. [Styling com NativeWind](#4-styling-com-nativewind)
5. [TypeScript](#5-typescript)
6. [Componentes](#6-componentes)
7. [Performance](#7-performance)
8. [Segurança](#8-segurança)
9. [Acessibilidade](#9-acessibilidade)
10. [Testes](#10-testes)
11. [Organização de Código](#11-organização-de-código)

---

## 1. React Native & Expo

### New Architecture (Fabric & TurboModules)

O SDK 54 é a última versão a suportar a Legacy Architecture. O SDK 55 suportará apenas a New Architecture.

```bash
# Validar compatibilidade de dependências
npx expo-doctor@latest
```

### ✅ DO: Usar APIs modernas do React Native

```typescript
// ✅ BOM: Imports da API pública
import { FlatList, View, Text } from 'react-native';

// ✅ BOM: Usar Expo SecureStore para dados sensíveis
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('authToken', token);
```

### ❌ DON'T: Usar APIs deprecated ou deep imports

```typescript
// ❌ MAU: Deep imports (deprecated em RN 0.80+)
import FlatList from 'react-native/Libraries/Lists/FlatList';

// ❌ MAU: AsyncStorage para tokens (inseguro)
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('authToken', token);
```

### ✅ DO: Configurar corretamente o app.json

```json
{
  "expo": {
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png"
      }
    }
  }
}
```

---

## 2. State Management

### Quando usar Context vs React Query

| Tipo de Estado | Solução | Exemplo |
|----------------|---------|---------|
| Estado do servidor | React Query | Lista de hotéis, detalhes |
| Estado global do cliente | React Context | Dados de booking, tema |
| Estado local do componente | useState/useReducer | Form inputs, modals |

### ✅ DO: Separar estado do servidor e cliente

```typescript
// ✅ BOM: React Query para dados do servidor
export function useHotels(filters?: HotelFilters) {
  return useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelsGateway.getHotels(filters),
    staleTime: 5 * 60 * 1000,
  });
}

// ✅ BOM: Context para estado do cliente
export function BookingProvider({ children }: PropsWithChildren) {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);

  // Usar useCallback para funções que são passadas como props
  const calculateTotal = useCallback(() => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return 0;
    return selectedRoom.pricePerNight * getNights();
  }, [selectedRoom, checkInDate, checkOutDate]);

  // Usar useMemo para o value do context
  const value = useMemo(() => ({
    selectedHotel,
    setSelectedHotel,
    calculateTotal,
    // ... outros valores
  }), [selectedHotel, calculateTotal]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}
```

### ❌ DON'T: Misturar responsabilidades

```typescript
// ❌ MAU: Fetch de dados dentro do Context
export function BookingProvider({ children }) {
  const [hotels, setHotels] = useState([]);

  // ❌ Não fazer fetch aqui - usar React Query
  useEffect(() => {
    fetch('/api/hotels')
      .then(res => res.json())
      .then(setHotels);
  }, []);

  // ❌ MAU: Value sem useMemo causa re-renders
  return (
    <BookingContext.Provider value={{ hotels, setHotels }}>
      {children}
    </BookingContext.Provider>
  );
}
```

### ❌ DON'T: Usar Context para dados que mudam frequentemente

```typescript
// ❌ MAU: Dados que mudam constantemente no Context
const [scrollPosition, setScrollPosition] = useState(0);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// ✅ BOM: Usar useState local ou refs para estes casos
const scrollPositionRef = useRef(0);
```

---

## 3. React Query

### Query Keys

### ✅ DO: Usar Query Key Factory Pattern

```typescript
// ✅ BOM: Centralizar query keys
// src/hooks/queries/queryKeys.ts
export const queryKeys = {
  hotels: {
    all: ['hotels'] as const,
    lists: () => [...queryKeys.hotels.all, 'list'] as const,
    list: (filters?: HotelFilters) => [...queryKeys.hotels.lists(), filters] as const,
    details: () => [...queryKeys.hotels.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.hotels.details(), id] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    user: (userId: string) => [...queryKeys.bookings.all, userId] as const,
  },
};

// Uso
const { data } = useQuery({
  queryKey: queryKeys.hotels.detail(hotelId),
  queryFn: () => hotelsGateway.getHotelById(hotelId),
});

// Invalidação precisa
queryClient.invalidateQueries({ queryKey: queryKeys.hotels.lists() });
```

### ❌ DON'T: Strings soltas como query keys

```typescript
// ❌ MAU: Strings hardcoded
const { data } = useQuery({
  queryKey: ['hotel', id], // Fácil de errar em outros lugares
  queryFn: () => getHotel(id),
});

// ❌ MAU: Invalidação imprecisa
queryClient.invalidateQueries({ queryKey: ['hotel'] }); // Pode invalidar demais
```

### Configuração

### ✅ DO: Configurar staleTime e gcTime apropriadamente

```typescript
// ✅ BOM: Configuração adequada
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 min - dados são "fresh"
      gcTime: 10 * 60 * 1000,       // 10 min - cache expira
      retry: 2,                      // Retry em falhas de rede
      refetchOnWindowFocus: false,   // Não aplicável em mobile
      refetchOnReconnect: true,      // Refetch ao reconectar
    },
  },
});
```

### ❌ DON'T: Usar defaults incorretos

```typescript
// ❌ MAU: staleTime: 0 causa refetch constante
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Dados sempre "stale" = muitos requests
    },
  },
});
```

### Mutations com Optimistic Updates

### ✅ DO: Implementar optimistic updates para UX instantânea

```typescript
// ✅ BOM: Optimistic update para favoritos
export function useFavoriteHotel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (hotelId: string) => favoritesGateway.toggle(hotelId),

    // Optimistic update ANTES do request
    onMutate: async (hotelId) => {
      // Cancelar queries em andamento
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.all });

      // Snapshot do estado anterior
      const previousFavorites = queryClient.getQueryData(queryKeys.favorites.all);

      // Optimistically update
      queryClient.setQueryData(queryKeys.favorites.all, (old: string[]) => {
        if (old?.includes(hotelId)) {
          return old.filter(id => id !== hotelId);
        }
        return [...(old || []), hotelId];
      });

      // Retornar context para rollback
      return { previousFavorites };
    },

    // Rollback em caso de erro
    onError: (err, hotelId, context) => {
      queryClient.setQueryData(
        queryKeys.favorites.all,
        context?.previousFavorites
      );
      showToast('Erro ao atualizar favoritos', 'error');
    },

    // Sempre re-sincronizar com servidor
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
    },
  });
}
```

### ❌ DON'T: Mutations sem feedback

```typescript
// ❌ MAU: Sem optimistic update - UX lenta
export function useFavoriteHotel() {
  return useMutation({
    mutationFn: (hotelId: string) => favoritesGateway.toggle(hotelId),
    // Utilizador espera pelo servidor para ver mudança
  });
}

// ❌ MAU: Sem tratamento de erro
export function useFavoriteHotel() {
  return useMutation({
    mutationFn: (hotelId: string) => favoritesGateway.toggle(hotelId),
    onSuccess: () => {
      // Falta onError - utilizador não sabe se falhou
    },
  });
}
```

### Loading States

### ✅ DO: Usar isPending e isLoading corretamente

```typescript
// ✅ BOM: Entender a diferença
function HotelList() {
  const { data, isPending, isFetching, isLoading } = useHotels();

  // isPending: true quando não há dados em cache (primeira vez)
  // isFetching: true quando está a fazer request (inclui refetch)
  // isLoading: isPending && isFetching (loading inicial)

  if (isPending) {
    return <HotelListSkeleton />;
  }

  return (
    <>
      {isFetching && <RefreshIndicator />}
      <FlatList data={data} ... />
    </>
  );
}
```

---

## 4. Styling com NativeWind

### Classes Estáticas vs Dinâmicas

### ✅ DO: Usar classes estáticas sempre que possível

```typescript
// ✅ BOM: Classes estáticas (compiladas em build time)
<View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
  <Text className="text-lg font-semibold text-neutral-900">
    {hotel.name}
  </Text>
</View>

// ✅ BOM: Condicionais com classes completas
<View className={isPremium ? 'bg-primary-500' : 'bg-neutral-100'}>
  <Text className={isSelected ? 'text-white font-bold' : 'text-neutral-700'}>
    {label}
  </Text>
</View>

// ✅ BOM: Usar clsx/classnames para múltiplas condições
import { clsx } from 'clsx';

<View
  className={clsx(
    'p-4 rounded-xl',
    isActive && 'bg-primary-500',
    isDisabled && 'opacity-50',
    size === 'lg' && 'p-6'
  )}
/>
```

### ❌ DON'T: Construir classes dinamicamente

```typescript
// ❌ MAU: Template literals com valores dinâmicos
const color = 'primary';
<View className={`bg-${color}-500`} />  // NÃO FUNCIONA!

// ❌ MAU: Concatenação de strings
const size = 'lg';
<Text className={'text-' + size} />  // NÃO FUNCIONA!

// ❌ MAU: Valores dinâmicos em classes
const padding = 4;
<View className={`p-${padding}`} />  // NÃO FUNCIONA!
```

### Padrões de Design System

### ✅ DO: Criar componentes UI reutilizáveis

```typescript
// ✅ BOM: Componente Button com variants
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const variants = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-neutral-100 active:bg-neutral-200',
  outline: 'border border-primary-500 bg-transparent',
  ghost: 'bg-transparent',
};

const sizes = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const textVariants = {
  primary: 'text-white',
  secondary: 'text-neutral-900',
  outline: 'text-primary-500',
  ghost: 'text-primary-500',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onPress,
  disabled,
  loading,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={clsx(
        'rounded-xl items-center justify-center',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50'
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#0E64D2'} />
      ) : (
        <Text className={clsx('font-semibold', textVariants[variant])}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
```

### ❌ DON'T: Repetir estilos em todos os lugares

```typescript
// ❌ MAU: Estilos duplicados
// Screen1.tsx
<Pressable className="bg-primary-500 px-4 py-3 rounded-xl">
  <Text className="text-white font-semibold">Submit</Text>
</Pressable>

// Screen2.tsx (mesmos estilos copiados)
<Pressable className="bg-primary-500 px-4 py-3 rounded-xl">
  <Text className="text-white font-semibold">Confirm</Text>
</Pressable>

// ✅ SOLUÇÃO: Usar o componente Button
<Button variant="primary">Submit</Button>
<Button variant="primary">Confirm</Button>
```

### Platform-Specific Styling

### ✅ DO: Usar variantes de plataforma

```typescript
// ✅ BOM: Variantes de plataforma do NativeWind
<View className="ios:pt-12 android:pt-4">
  <Text className="ios:font-sf-pro android:font-roboto">
    Platform specific
  </Text>
</View>

// ✅ BOM: SafeAreaView para iOS
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView className="flex-1 bg-neutral-50">
  {/* Content */}
</SafeAreaView>
```

---

## 5. TypeScript

### Tipos vs Interfaces

### ✅ DO: Usar interfaces para objetos, types para unions

```typescript
// ✅ BOM: Interface para shapes de objetos
interface Hotel {
  id: string;
  name: string;
  location: HotelLocation;
  rating: number;
  rooms: Room[];
}

interface HotelLocation {
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// ✅ BOM: Type para unions e intersections
type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
type PaymentMethod = 'card' | 'paypal' | 'apple_pay';

// ✅ BOM: Type para utility types
type HotelPreview = Pick<Hotel, 'id' | 'name' | 'rating'>;
type PartialHotel = Partial<Hotel>;
type RequiredHotel = Required<Hotel>;
```

### ❌ DON'T: Usar `any` ou ignorar tipos

```typescript
// ❌ MAU: any em todo lado
function processHotel(hotel: any) {
  return hotel.name; // Sem type safety
}

// ❌ MAU: @ts-ignore
// @ts-ignore
const result = someFunction(invalidArg);

// ❌ MAU: Type assertions desnecessárias
const hotel = response.data as Hotel; // Sem validação
```

### ✅ DO: Usar type inference quando óbvio

```typescript
// ✅ BOM: TypeScript infere o tipo
const [count, setCount] = useState(0); // Infere number
const [name, setName] = useState(''); // Infere string

// ✅ BOM: Explicitar quando não é óbvio
const [hotel, setHotel] = useState<Hotel | null>(null);
const [filters, setFilters] = useState<HotelFilters>({});

// ✅ BOM: Usar satisfies para validação
const config = {
  apiUrl: 'https://api.staygo.com',
  timeout: 5000,
} satisfies AppConfig;
```

### Props de Componentes

### ✅ DO: Tipar props explicitamente

```typescript
// ✅ BOM: Props bem tipadas
interface HotelCardProps {
  hotel: Hotel;
  onPress?: (hotel: Hotel) => void;
  onFavorite?: (hotelId: string) => void;
  isFavorite?: boolean;
  testID?: string;
}

export function HotelCard({
  hotel,
  onPress,
  onFavorite,
  isFavorite = false,
  testID,
}: HotelCardProps) {
  // ...
}

// ✅ BOM: Usar PropsWithChildren
interface CardProps {
  title: string;
  className?: string;
}

export function Card({ title, className, children }: PropsWithChildren<CardProps>) {
  // ...
}
```

### ❌ DON'T: Props sem tipos ou com tipos fracos

```typescript
// ❌ MAU: Sem tipos
function HotelCard(props) {
  return <Text>{props.hotel.name}</Text>;
}

// ❌ MAU: Props com any
interface BadProps {
  data: any;
  onAction: any;
}

// ❌ MAU: Props muito genéricas
interface TooGenericProps {
  item: object;
  callback: Function;
}
```

---

## 6. Componentes

### Estrutura de Componentes

### ✅ DO: Seguir estrutura consistente

```typescript
// ✅ BOM: Estrutura clara e organizada
import { memo, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Hotel } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { triggerHaptic } from '@/utils/haptics';

// 1. Interface/Types no topo
interface HotelCardProps {
  hotel: Hotel;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

// 2. Componente com memo para performance
export const HotelCard = memo(function HotelCard({
  hotel,
  onFavorite,
  isFavorite = false,
}: HotelCardProps) {
  const router = useRouter();

  // 3. Hooks primeiro
  const handlePress = useCallback(() => {
    triggerHaptic('light');
    router.push(`/hotel/${hotel.id}`);
  }, [hotel.id, router]);

  const handleFavorite = useCallback(() => {
    triggerHaptic('medium');
    onFavorite?.(hotel.id);
  }, [hotel.id, onFavorite]);

  // 4. Early returns para edge cases
  if (!hotel) return null;

  // 5. Render
  return (
    <Pressable onPress={handlePress} className="bg-white rounded-2xl p-4">
      <View className="flex-row justify-between">
        <Text className="text-lg font-semibold">{hotel.name}</Text>
        <Pressable onPress={handleFavorite}>
          <Heart
            size={24}
            color={isFavorite ? '#EF4444' : '#A3A3A3'}
            fill={isFavorite ? '#EF4444' : 'transparent'}
          />
        </Pressable>
      </View>
      <Text className="text-primary-500 font-bold">
        {formatCurrency(hotel.pricePerNight)}/night
      </Text>
    </Pressable>
  );
});
```

### ❌ DON'T: Componentes desorganizados

```typescript
// ❌ MAU: Misturar tudo sem ordem
export default function HotelCard(props) {
  // Sem destructuring
  // Sem tipagem
  // Hooks misturados com lógica
  const [state, setState] = useState();

  // Lógica inline
  if (props.hotel.rating > 4) {
    // ...
  }

  // Funções definidas inline no render
  return (
    <Pressable onPress={() => {
      // Lógica complexa inline
      doSomething();
      doAnotherThing();
    }}>
      {/* JSX muito aninhado */}
    </Pressable>
  );
}
```

### Custom Hooks

### ✅ DO: Extrair lógica para custom hooks

```typescript
// ✅ BOM: Custom hook para lógica de favoritos
// src/hooks/useFavorites.ts
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  };

  const toggleFavorite = useCallback(async (hotelId: string) => {
    const newFavorites = favorites.includes(hotelId)
      ? favorites.filter(id => id !== hotelId)
      : [...favorites, hotelId];

    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    triggerHaptic('medium');
  }, [favorites]);

  const isFavorite = useCallback(
    (hotelId: string) => favorites.includes(hotelId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}

// Uso no componente
function HotelList() {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <HotelCard
      hotel={hotel}
      isFavorite={isFavorite(hotel.id)}
      onFavorite={toggleFavorite}
    />
  );
}
```

### ❌ DON'T: Toda lógica dentro do componente

```typescript
// ❌ MAU: Componente com demasiada responsabilidade
function HotelList() {
  const [favorites, setFavorites] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Múltiplos useEffects
  useEffect(() => { /* load favorites */ }, []);
  useEffect(() => { /* load hotels */ }, [filters]);
  useEffect(() => { /* sync favorites */ }, [favorites]);

  // Múltiplas funções
  const toggleFavorite = () => { /* ... */ };
  const applyFilters = () => { /* ... */ };
  const refreshData = () => { /* ... */ };

  // 200+ linhas de código...
}
```

---

## 7. Performance

### FlatList Optimization

### ✅ DO: Otimizar FlatLists corretamente

```typescript
// ✅ BOM: FlatList otimizada
function HotelList({ hotels }: { hotels: Hotel[] }) {
  // Memoizar renderItem
  const renderHotel = useCallback(
    ({ item }: { item: Hotel }) => (
      <HotelCard hotel={item} />
    ),
    []
  );

  // Key extractor estável
  const keyExtractor = useCallback(
    (item: Hotel) => item.id,
    []
  );

  // getItemLayout para listas com altura fixa
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: HOTEL_CARD_HEIGHT,
      offset: HOTEL_CARD_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <FlatList
      data={hotels}
      renderItem={renderHotel}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}

      // Props de performance
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={5}
      updateCellsBatchingPeriod={50}

      // Separador memoizado
      ItemSeparatorComponent={Separator}

      // Empty state
      ListEmptyComponent={<EmptyHotels />}
    />
  );
}

// Separador como componente separado (memoizado automaticamente)
function Separator() {
  return <View className="h-4" />;
}
```

### ❌ DON'T: FlatList não otimizada

```typescript
// ❌ MAU: Funções inline e sem otimizações
function HotelList({ hotels }) {
  return (
    <FlatList
      data={hotels}
      // ❌ Função inline recria em cada render
      renderItem={({ item }) => <HotelCard hotel={item} />}
      // ❌ Função inline
      keyExtractor={(item) => item.id}
      // ❌ Sem props de performance
    />
  );
}
```

### Memoização

### ✅ DO: Memoizar quando necessário

```typescript
// ✅ BOM: useMemo para cálculos pesados
function BookingSummary({ room, checkIn, checkOut }: Props) {
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return differenceInDays(checkOut, checkIn);
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    const subtotal = room.pricePerNight * nights;
    const taxes = subtotal * 0.1;
    const fees = 25;
    return subtotal + taxes + fees;
  }, [room.pricePerNight, nights]);

  return (
    <View>
      <Text>{nights} nights</Text>
      <Text>Total: {formatCurrency(totalPrice)}</Text>
    </View>
  );
}

// ✅ BOM: useCallback para funções passadas como props
function ParentComponent() {
  const handlePress = useCallback((id: string) => {
    router.push(`/hotel/${id}`);
  }, [router]);

  return <ChildComponent onPress={handlePress} />;
}

// ✅ BOM: memo para componentes que recebem mesmas props
const ExpensiveChart = memo(function ExpensiveChart({ data }: Props) {
  // Renderização pesada
  return <Chart data={data} />;
});
```

### ❌ DON'T: Memoização prematura ou incorreta

```typescript
// ❌ MAU: useMemo para valores simples
const name = useMemo(() => hotel.name, [hotel.name]); // Desnecessário

// ❌ MAU: useCallback sem dependencies corretas
const handlePress = useCallback(() => {
  doSomething(someValue); // someValue não está nas deps!
}, []); // ❌ Missing dependency

// ❌ MAU: memo em componentes que sempre re-renderizam
const AlwaysChanging = memo(function AlwaysChanging({ timestamp }) {
  return <Text>{timestamp}</Text>; // timestamp muda sempre
});

// ❌ MAU: useMemo com deps que mudam sempre
const filtered = useMemo(
  () => hotels.filter(h => h.name.includes(search)),
  [hotels, search, {}] // ❌ Objeto inline invalida sempre
);
```

### Imagens

### ✅ DO: Otimizar carregamento de imagens

```typescript
// ✅ BOM: Usar FastImage com cache
import FastImage from 'react-native-fast-image';

function HotelImage({ uri }: { uri: string }) {
  return (
    <FastImage
      source={{
        uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      style={{ width: 200, height: 150 }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

// ✅ BOM: Placeholder enquanto carrega
function HotelImage({ uri }: { uri: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View>
      {!loaded && <ImageSkeleton />}
      <FastImage
        source={{ uri }}
        onLoad={() => setLoaded(true)}
        style={[styles.image, !loaded && styles.hidden]}
      />
    </View>
  );
}
```

---

## 8. Segurança

### Armazenamento Seguro

### ✅ DO: Usar SecureStore para dados sensíveis

```typescript
// ✅ BOM: SecureStore para tokens
import * as SecureStore from 'expo-secure-store';

export const secureStorage = {
  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync('auth_token', token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('auth_token');
  },

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync('auth_token');
  },

  async setRefreshToken(token: string): Promise<void> {
    await SecureStore.setItemAsync('refresh_token', token);
  },
};

// Uso
await secureStorage.setToken(response.accessToken);
const token = await secureStorage.getToken();
```

### ❌ DON'T: Guardar dados sensíveis em AsyncStorage

```typescript
// ❌ MAU: AsyncStorage não é encriptado
import AsyncStorage from '@react-native-async-storage/async-storage';

// ❌ NUNCA fazer isto
await AsyncStorage.setItem('auth_token', token);
await AsyncStorage.setItem('user_password', password);
await AsyncStorage.setItem('credit_card', cardNumber);
```

### API Security

### ✅ DO: Implementar autenticação corretamente

```typescript
// ✅ BOM: Interceptor com refresh token
// src/lib/api.ts
const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(async (config) => {
  const token = await secureStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await secureStorage.getRefreshToken();
        const { data } = await authApi.refresh(refreshToken);

        await secureStorage.setToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Logout user
        await secureStorage.removeToken();
        router.replace('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

### ❌ DON'T: Expor dados sensíveis

```typescript
// ❌ MAU: Tokens em URLs
fetch(`/api/hotels?token=${authToken}`);

// ❌ MAU: Logs com dados sensíveis
console.log('User data:', { email, password, token });

// ❌ MAU: Hardcoded secrets
const API_KEY = 'sk_live_abc123'; // NUNCA!
```

### Validação de Input

### ✅ DO: Validar inputs do utilizador

```typescript
// ✅ BOM: Validação com Zod
import { z } from 'zod';

const bookingSchema = z.object({
  hotelId: z.string().uuid(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  guests: z.number().min(1).max(10),
  paymentMethod: z.enum(['card', 'paypal', 'apple_pay']),
});

function createBooking(data: unknown) {
  const validated = bookingSchema.parse(data);
  // Agora temos dados validados e tipados
  return api.post('/bookings', validated);
}

// ✅ BOM: Sanitizar strings
function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .slice(0, 100) // Limitar tamanho
    .replace(/[<>]/g, ''); // Remover caracteres perigosos
}
```

---

## 9. Acessibilidade

### Labels e Hints

### ✅ DO: Adicionar labels de acessibilidade

```typescript
// ✅ BOM: Componente acessível
function HotelCard({ hotel, onFavorite, isFavorite }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${hotel.name}, ${hotel.rating} stars, ${formatCurrency(hotel.pricePerNight)} per night`}
      accessibilityHint="Double tap to view hotel details"
      onPress={() => router.push(`/hotel/${hotel.id}`)}
    >
      <Image
        source={{ uri: hotel.image }}
        accessibilityLabel={`Photo of ${hotel.name}`}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        accessibilityHint={`Double tap to ${isFavorite ? 'remove from' : 'add to'} favorites`}
        onPress={() => onFavorite(hotel.id)}
      >
        <Heart size={24} />
      </Pressable>
    </Pressable>
  );
}

// ✅ BOM: Form input acessível
<View>
  <Text nativeID="guestsLabel">Number of Guests</Text>
  <TextInput
    accessibilityLabelledBy="guestsLabel"
    accessibilityHint="Enter the number of guests"
    keyboardType="numeric"
    value={guests.toString()}
    onChangeText={(text) => setGuests(parseInt(text) || 0)}
  />
</View>
```

### ❌ DON'T: Ignorar acessibilidade

```typescript
// ❌ MAU: Sem labels
<Pressable onPress={onPress}>
  <Image source={{ uri: hotel.image }} />
  <HeartIcon />
</Pressable>

// ❌ MAU: Labels não descritivos
<Pressable accessibilityLabel="Button">
  <Text>Book Now</Text>
</Pressable>

// ❌ MAU: Imagens sem descrição
<Image source={{ uri: hotel.image }} />
```

### Touch Targets

### ✅ DO: Garantir tamanhos mínimos de toque

```typescript
// ✅ BOM: Área de toque adequada (mínimo 44x44 iOS, 48x48 Android)
<Pressable
  onPress={onClose}
  className="w-12 h-12 items-center justify-center"
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  accessibilityRole="button"
  accessibilityLabel="Close"
>
  <X size={24} color="#666" />
</Pressable>

// ✅ BOM: hitSlop para aumentar área de toque sem mudar visual
<Pressable
  hitSlop={20}
  onPress={onFavorite}
>
  <Heart size={20} />
</Pressable>
```

### ❌ DON'T: Targets muito pequenos

```typescript
// ❌ MAU: Ícone pequeno sem hitSlop
<Pressable onPress={onClose}>
  <X size={16} /> {/* Muito pequeno para tocar */}
</Pressable>
```

### Screen Reader Support

### ✅ DO: Anunciar mudanças importantes

```typescript
// ✅ BOM: Anunciar para screen readers
import { AccessibilityInfo } from 'react-native';

function BookingConfirmation({ bookingId }: Props) {
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(
      `Booking confirmed. Your booking reference is ${bookingId}`
    );
  }, [bookingId]);

  return (
    <View accessibilityLiveRegion="polite">
      <Text>Booking Confirmed!</Text>
      <Text>Reference: {bookingId}</Text>
    </View>
  );
}

// ✅ BOM: Agrupar elementos relacionados
<View
  accessible={true}
  accessibilityLabel={`${hotel.name}, rated ${hotel.rating} stars, ${hotel.reviewCount} reviews, ${formatCurrency(hotel.pricePerNight)} per night`}
>
  <Text>{hotel.name}</Text>
  <Text>{hotel.rating} ★</Text>
  <Text>{hotel.reviewCount} reviews</Text>
  <Text>{formatCurrency(hotel.pricePerNight)}/night</Text>
</View>
```

---

## 10. Testes

### Unit Tests

### ✅ DO: Testar lógica de negócio

```typescript
// ✅ BOM: Testes para utils
// src/utils/__tests__/formatters.test.ts
import { formatCurrency, formatDate, calculateNights } from '../formatters';

describe('formatCurrency', () => {
  it('should format positive numbers', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(99.99)).toBe('$99.99');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should handle decimals', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
  });
});

describe('calculateNights', () => {
  it('should calculate nights between dates', () => {
    const checkIn = new Date('2024-03-01');
    const checkOut = new Date('2024-03-05');
    expect(calculateNights(checkIn, checkOut)).toBe(4);
  });

  it('should return 0 for same day', () => {
    const date = new Date('2024-03-01');
    expect(calculateNights(date, date)).toBe(0);
  });
});
```

### ✅ DO: Testar hooks

```typescript
// ✅ BOM: Testes para custom hooks
// src/hooks/__tests__/useBooking.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useBooking } from '../useBooking';
import { BookingProvider } from '@/context/BookingContext';

const wrapper = ({ children }) => (
  <BookingProvider>{children}</BookingProvider>
);

describe('useBooking', () => {
  it('should calculate total correctly', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.setSelectedRoom({
        id: '1',
        pricePerNight: 100,
      });
      result.current.setCheckInDate(new Date('2024-03-01'));
      result.current.setCheckOutDate(new Date('2024-03-03'));
    });

    expect(result.current.calculateTotal()).toBe(200);
  });

  it('should reset booking state', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.setSelectedHotel({ id: '1', name: 'Test' });
      result.current.resetBooking();
    });

    expect(result.current.selectedHotel).toBeNull();
  });
});
```

### Component Tests

### ✅ DO: Testar componentes críticos

```typescript
// ✅ BOM: Testes de componente
// src/components/__tests__/HotelCard.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { HotelCard } from '../HotelCard';

const mockHotel = {
  id: '1',
  name: 'Grand Hotel',
  rating: 4.5,
  pricePerNight: 150,
  location: { city: 'Paris' },
  image: 'https://example.com/hotel.jpg',
};

describe('HotelCard', () => {
  it('should render hotel information', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);

    expect(getByText('Grand Hotel')).toBeTruthy();
    expect(getByText('Paris')).toBeTruthy();
    expect(getByText('$150/night')).toBeTruthy();
  });

  it('should call onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <HotelCard hotel={mockHotel} onPress={onPress} testID="hotel-card" />
    );

    fireEvent.press(getByTestId('hotel-card'));
    expect(onPress).toHaveBeenCalledWith(mockHotel);
  });

  it('should show filled heart when favorited', () => {
    const { getByTestId } = render(
      <HotelCard hotel={mockHotel} isFavorite={true} testID="hotel-card" />
    );

    const heart = getByTestId('favorite-icon');
    expect(heart.props.fill).toBe('#EF4444');
  });
});
```

### ❌ DON'T: Testes frágeis ou sem valor

```typescript
// ❌ MAU: Testar implementação, não comportamento
it('should call useState', () => {
  const useStateSpy = jest.spyOn(React, 'useState');
  render(<Component />);
  expect(useStateSpy).toHaveBeenCalled();
});

// ❌ MAU: Snapshots para tudo
it('should match snapshot', () => {
  const tree = render(<LargeComponent />);
  expect(tree).toMatchSnapshot(); // Frágil, quebra com qualquer mudança
});

// ❌ MAU: Testes que não testam nada
it('should render', () => {
  render(<Component />);
  // Não verifica nada específico
});
```

---

## 11. Organização de Código

### Estrutura de Pastas

### ✅ DO: Organizar por feature/domínio

```
src/
├── features/                    # Por funcionalidade
│   ├── hotels/
│   │   ├── components/
│   │   │   ├── HotelCard.tsx
│   │   │   ├── HotelList.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useHotels.ts
│   │   │   └── useHotelFilters.ts
│   │   ├── screens/
│   │   │   ├── HotelDetailScreen.tsx
│   │   │   └── HotelSearchScreen.tsx
│   │   ├── services/
│   │   │   └── hotelsGateway.ts
│   │   └── types/
│   │       └── hotel.ts
│   │
│   ├── booking/
│   │   ├── components/
│   │   ├── context/
│   │   │   └── BookingContext.tsx
│   │   ├── hooks/
│   │   └── screens/
│   │
│   └── favorites/
│       ├── components/
│       ├── hooks/
│       └── screens/
│
├── shared/                      # Código partilhado
│   ├── components/
│   │   └── ui/                  # Componentes base (Button, Card, etc)
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── haptics.ts
│   └── theme/
│       └── colors.ts
│
└── core/                        # Infraestrutura
    ├── api/
    │   └── client.ts
    ├── config/
    │   └── env.ts
    └── lib/
        └── queryClient.ts
```

### ❌ DON'T: Organização flat ou confusa

```
// ❌ MAU: Tudo junto
src/
├── components/
│   ├── Button.tsx
│   ├── HotelCard.tsx
│   ├── BookingForm.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Modal.tsx
│   └── ... (50+ ficheiros)
├── hooks/
│   └── ... (todos os hooks misturados)
└── utils/
    └── ... (tudo junto)
```

### Imports e Exports

### ✅ DO: Usar barrel exports

```typescript
// ✅ BOM: Index files para exports limpos
// src/components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { Badge } from './Badge';

// Uso
import { Button, Card, Input } from '@/components/ui';
```

### ❌ DON'T: Imports longos e desorganizados

```typescript
// ❌ MAU: Imports individuais
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
```

---

## Checklist de Code Review

### Antes de submeter PR

- [ ] Código compila sem erros TypeScript
- [ ] Sem warnings do ESLint
- [ ] Testes passam (`npm test`)
- [ ] Componentes têm props tipadas
- [ ] Sem `any` types
- [ ] Hooks têm dependencies corretas
- [ ] FlatLists otimizadas
- [ ] Dados sensíveis em SecureStore
- [ ] Labels de acessibilidade presentes
- [ ] Sem console.logs em produção

### Performance Review

- [ ] Funções em props estão memoizadas (useCallback)
- [ ] Cálculos pesados usam useMemo
- [ ] Componentes de lista usam memo
- [ ] Imagens têm tamanhos apropriados
- [ ] Sem re-renders desnecessários

### Security Review

- [ ] Inputs validados
- [ ] Tokens em SecureStore
- [ ] Sem secrets hardcoded
- [ ] API calls autenticadas

---

## Recursos Adicionais

### Documentação Oficial
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [NativeWind Docs](https://www.nativewind.dev/docs)
- [TanStack Query Docs](https://tanstack.com/query/v5/docs)

### Ferramentas
- [Expo Doctor](https://docs.expo.dev/more/expo-cli/#expo-doctor) - Validação de dependências
- [Flipper](https://fbflipper.com/) - Debugging
- [Reactotron](https://github.com/infinitered/reactotron) - Debugging React Native

### Artigos Recomendados
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Expo New Architecture Guide](https://docs.expo.dev/guides/new-architecture/)
