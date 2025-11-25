import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { useBooking } from '@context';
import { colors } from '@theme';

export default function CalendarScreen() {
  const router = useRouter();
  const { booking, setDates } = useBooking();
  const [checkIn, setCheckIn] = useState<Date | null>(booking.checkIn);
  const [checkOut, setCheckOut] = useState<Date | null>(booking.checkOut);

  // Função simples para gerar datas dos próximos 60 dias
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const handleDateSelect = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      // Primeira seleção ou resetar
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      // Segunda seleção
      if (date > checkIn) {
        setCheckOut(date);
      } else {
        setCheckIn(date);
        setCheckOut(null);
      }
    }
  };

  const isDateSelected = (date: Date) => {
    if (!checkIn) return false;
    const dateTime = date.getTime();
    const checkInTime = checkIn.getTime();
    const checkOutTime = checkOut?.getTime();

    if (checkOutTime) {
      return dateTime >= checkInTime && dateTime <= checkOutTime;
    }
    return dateTime === checkInTime;
  };

  const isDateInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    const dateTime = date.getTime();
    return dateTime > checkIn.getTime() && dateTime < checkOut.getTime();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Selecione';
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleContinue = () => {
    if (checkIn && checkOut) {
      setDates(checkIn, checkOut);
      router.push('/booking-review');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <CalendarIcon size={32} color={colors.primary} />
          <Text style={styles.title}>Selecione as Datas</Text>
          <Text style={styles.subtitle}>
            Escolha check-in e check-out
          </Text>
        </View>

        {/* Selected Dates Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Check-in</Text>
            <Text style={styles.summaryValue}>{formatDate(checkIn)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Check-out</Text>
            <Text style={styles.summaryValue}>{formatDate(checkOut)}</Text>
          </View>
          {checkIn && checkOut && (
            <>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Noites</Text>
                <Text style={styles.summaryValue}>{getNights()}</Text>
              </View>
            </>
          )}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendar}>
          {dates.map((date, index) => {
            const isSelected = isDateSelected(date);
            const isInRange = isDateInRange(date);
            const isCheckIn = checkIn?.getTime() === date.getTime();
            const isCheckOut = checkOut?.getTime() === date.getTime();

            return (
              <Pressable
                key={index}
                style={[
                  styles.dateButton,
                  isSelected && styles.dateButtonSelected,
                  isInRange && styles.dateButtonInRange,
                ]}
                onPress={() => handleDateSelect(date)}
              >
                <Text style={styles.dateDay}>
                  {date.toLocaleDateString('pt-PT', { weekday: 'short' })}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    (isCheckIn || isCheckOut) && styles.dateNumberSelected,
                  ]}
                >
                  {date.getDate()}
                </Text>
                <Text style={styles.dateMonth}>
                  {date.toLocaleDateString('pt-PT', { month: 'short' })}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      {checkIn && checkOut && (
        <View style={styles.footer}>
          <Button size="lg" fullWidth onPress={handleContinue}>
            Continuar ({getNights()} {getNights() === 1 ? 'noite' : 'noites'})
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: colors.gray50,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  dateButton: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: colors.gray50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  dateButtonSelected: {
    backgroundColor: colors.primary,
  },
  dateButtonInRange: {
    backgroundColor: colors.primary + '20',
  },
  dateDay: {
    fontSize: 10,
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginVertical: 2,
  },
  dateNumberSelected: {
    color: colors.white,
  },
  dateMonth: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  footer: {
    padding: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
