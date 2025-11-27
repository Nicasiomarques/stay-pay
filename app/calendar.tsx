import { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Minus, Users } from 'lucide-react-native';
import { useBooking } from '@context';
import { haptics } from '@/utils/haptics';

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function CalendarScreen() {
  const router = useRouter();
  const { booking, setDates, setGuests } = useBooking();
  const [checkIn, setCheckIn] = useState<Date | null>(booking.checkIn);
  const [checkOut, setCheckOut] = useState<Date | null>(booking.checkOut);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [adults, setAdults] = useState(booking.guests.adults);
  const [children, setChildren] = useState(booking.guests.children);

  const nightsRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const guestsRef = useRef<any>(null);

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const handlePrevMonth = () => {
    haptics.light();
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    haptics.light();
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const handleDateSelect = (date: Date) => {
    haptics.light();
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (date > checkIn) {
        setCheckOut(date);
        // Animate nights info and button
        setTimeout(() => {
          nightsRef.current?.bounceIn?.(500);
          buttonRef.current?.pulse?.(400);
        }, 100);
      } else {
        setCheckIn(date);
        setCheckOut(null);
      }
    }
  };

  const isCheckIn = (date: Date) => {
    return checkIn?.toDateString() === date.toDateString();
  };

  const isCheckOut = (date: Date) => {
    return checkOut?.toDateString() === date.toDateString();
  };

  const isInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    const dateTime = date.getTime();
    return dateTime > checkIn.getTime() && dateTime < checkOut.getTime();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Selecionar';
    return date.toLocaleDateString('pt-PT', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleContinue = () => {
    haptics.medium();
    if (checkIn && checkOut) {
      setDates(checkIn, checkOut);
      setGuests({ adults, children });
      router.push('/booking-review');
    }
  };

  const handleAdultsChange = (increment: boolean) => {
    haptics.light();
    if (increment) {
      setAdults(prev => Math.min(prev + 1, 10));
    } else {
      setAdults(prev => Math.max(prev - 1, 1));
    }
    guestsRef.current?.pulse?.(200);
  };

  const handleChildrenChange = (increment: boolean) => {
    haptics.light();
    if (increment) {
      setChildren(prev => Math.min(prev + 1, 6));
    } else {
      setChildren(prev => Math.max(prev - 1, 0));
    }
    guestsRef.current?.pulse?.(200);
  };

  const getTotalGuests = () => adults + children;

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];

    // Add empty slots for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <Animatable.View
        animation="fadeIn"
        duration={400}
        className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200"
      >
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#171717" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Selecionar Datas</Text>
        <View className="w-10" />
      </Animatable.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Date Summary */}
        <View className="flex-row items-center px-5 py-6 gap-4">
          <Animatable.View
            animation="fadeInLeft"
            delay={100}
            duration={500}
            className="flex-1 bg-gray-100 rounded-xl p-4 items-center"
          >
            <Text className="text-xs font-medium text-gray-500 mb-1">Check-in</Text>
            <Text className={`text-base font-semibold ${checkIn ? 'text-gray-900' : 'text-gray-400'}`}>
              {formatDate(checkIn)}
            </Text>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={200} className="w-6 items-center">
            <View className="w-6 h-0.5 bg-gray-200 rounded-sm" />
          </Animatable.View>

          <Animatable.View
            animation="fadeInRight"
            delay={100}
            duration={500}
            className="flex-1 bg-gray-100 rounded-xl p-4 items-center"
          >
            <Text className="text-xs font-medium text-gray-500 mb-1">Check-out</Text>
            <Text className={`text-base font-semibold ${checkOut ? 'text-gray-900' : 'text-gray-400'}`}>
              {formatDate(checkOut)}
            </Text>
          </Animatable.View>
        </View>

        {/* Month Navigator */}
        <Animatable.View
          animation="fadeIn"
          delay={200}
          duration={400}
          className="flex-row items-center justify-between px-5 py-4"
        >
          <TouchableOpacity
            onPress={handlePrevMonth}
            className="w-10 h-10 items-center justify-center bg-gray-100 rounded-xl"
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color="#171717" strokeWidth={2} />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-900">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>

          <TouchableOpacity
            onPress={handleNextMonth}
            className="w-10 h-10 items-center justify-center bg-gray-100 rounded-xl"
            activeOpacity={0.7}
          >
            <ChevronRight size={24} color="#171717" strokeWidth={2} />
          </TouchableOpacity>
        </Animatable.View>

        {/* Weekday Headers */}
        <Animatable.View animation="fadeIn" delay={250} duration={400} className="flex-row px-4 pb-2">
          {WEEKDAYS.map((day) => (
            <Text key={day} className="flex-1 text-center text-xs font-semibold text-gray-500 uppercase">
              {day}
            </Text>
          ))}
        </Animatable.View>

        {/* Calendar Grid */}
        <Animatable.View animation="fadeInUp" delay={300} duration={500} className="flex-row flex-wrap px-3">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <View key={`empty-${index}`} className="w-[14.28%] aspect-square items-center justify-center my-0.5" />;
            }

            const isPast = isPastDate(date);
            const isStart = isCheckIn(date);
            const isEnd = isCheckOut(date);
            const isBetween = isInRange(date);

            return (
              <TouchableOpacity
                key={date.toISOString()}
                className={`w-[14.28%] aspect-square items-center justify-center my-0.5 ${
                  isBetween ? 'bg-secondary/10' : ''
                } ${(isStart || isEnd) ? 'bg-secondary rounded-xl' : ''}`}
                onPress={() => !isPast && handleDateSelect(date)}
                disabled={isPast}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-base font-medium ${
                    isPast ? 'text-gray-300' : 'text-gray-900'
                  } ${(isStart || isEnd) ? 'text-white font-semibold' : ''}`}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animatable.View>

        {/* Nights Info */}
        {checkIn && checkOut && (
          <Animatable.View ref={nightsRef} animation="bounceIn" duration={500} className="items-center py-5">
            <Text className="text-sm font-semibold text-secondary">
              {getNights()} {getNights() === 1 ? 'noite' : 'noites'} selecionada{getNights() !== 1 ? 's' : ''}
            </Text>
          </Animatable.View>
        )}

        {/* Guests Section */}
        <Animatable.View
          ref={guestsRef}
          animation="fadeInUp"
          delay={350}
          duration={500}
          className="mx-5 mt-4 mb-6 bg-gray-50 rounded-2xl p-5"
        >
          <View className="flex-row items-center mb-4">
            <Users size={20} color="#171717" strokeWidth={2} />
            <Text className="text-base font-semibold text-gray-900 ml-2">Hóspedes</Text>
            <Text className="text-sm text-gray-500 ml-auto">
              {getTotalGuests()} {getTotalGuests() === 1 ? 'hóspede' : 'hóspedes'}
            </Text>
          </View>

          {/* Adults Counter */}
          <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View>
              <Text className="text-base font-medium text-gray-900">Adultos</Text>
              <Text className="text-xs text-gray-500">13 anos ou mais</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => handleAdultsChange(false)}
                disabled={adults <= 1}
                className={`w-9 h-9 rounded-full items-center justify-center ${
                  adults <= 1 ? 'bg-gray-100' : 'bg-white border border-gray-300'
                }`}
                activeOpacity={0.7}
              >
                <Minus size={18} color={adults <= 1 ? '#A3A3A3' : '#171717'} strokeWidth={2} />
              </TouchableOpacity>
              <Text className="text-base font-semibold text-gray-900 w-6 text-center">{adults}</Text>
              <TouchableOpacity
                onPress={() => handleAdultsChange(true)}
                disabled={adults >= 10}
                className={`w-9 h-9 rounded-full items-center justify-center ${
                  adults >= 10 ? 'bg-gray-100' : 'bg-white border border-gray-300'
                }`}
                activeOpacity={0.7}
              >
                <Plus size={18} color={adults >= 10 ? '#A3A3A3' : '#171717'} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Children Counter */}
          <View className="flex-row items-center justify-between py-3">
            <View>
              <Text className="text-base font-medium text-gray-900">Crianças</Text>
              <Text className="text-xs text-gray-500">2 a 12 anos</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => handleChildrenChange(false)}
                disabled={children <= 0}
                className={`w-9 h-9 rounded-full items-center justify-center ${
                  children <= 0 ? 'bg-gray-100' : 'bg-white border border-gray-300'
                }`}
                activeOpacity={0.7}
              >
                <Minus size={18} color={children <= 0 ? '#A3A3A3' : '#171717'} strokeWidth={2} />
              </TouchableOpacity>
              <Text className="text-base font-semibold text-gray-900 w-6 text-center">{children}</Text>
              <TouchableOpacity
                onPress={() => handleChildrenChange(true)}
                disabled={children >= 6}
                className={`w-9 h-9 rounded-full items-center justify-center ${
                  children >= 6 ? 'bg-gray-100' : 'bg-white border border-gray-300'
                }`}
                activeOpacity={0.7}
              >
                <Plus size={18} color={children >= 6 ? '#A3A3A3' : '#171717'} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>

      {/* Bottom Button */}
      <Animatable.View
        ref={buttonRef}
        animation="slideInUp"
        delay={400}
        duration={500}
        className="absolute bottom-0 left-0 right-0 p-5 pb-8 bg-white border-t border-gray-200"
      >
        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${
            checkIn && checkOut ? 'bg-secondary' : 'bg-gray-200'
          }`}
          style={checkIn && checkOut ? {
            shadowColor: '#10B981',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          } : undefined}
          onPress={handleContinue}
          disabled={!checkIn || !checkOut}
          activeOpacity={0.9}
        >
          <Text className="text-base font-semibold text-white">
            {checkIn && checkOut
              ? `Continuar · ${getNights()} ${getNights() === 1 ? 'noite' : 'noites'}`
              : 'Selecionar datas'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
