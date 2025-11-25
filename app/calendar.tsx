import { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useBooking } from '@context';
import { haptics } from '@/utils/haptics';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarScreen() {
  const router = useRouter();
  const { booking, setDates } = useBooking();
  const [checkIn, setCheckIn] = useState<Date | null>(booking.checkIn);
  const [checkOut, setCheckOut] = useState<Date | null>(booking.checkOut);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
    if (!date) return 'Select';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleContinue = () => {
    haptics.medium();
    if (checkIn && checkOut) {
      setDates(checkIn, checkOut);
      router.push('/booking-review');
    }
  };

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
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#171717" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Select Dates</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Date Summary */}
        <View className="flex-row items-center px-5 py-6 gap-4">
          <View className="flex-1 bg-gray-100 rounded-xl p-4 items-center">
            <Text className="text-xs font-medium text-gray-500 mb-1">Check-in</Text>
            <Text className={`text-base font-semibold ${checkIn ? 'text-gray-900' : 'text-gray-400'}`}>
              {formatDate(checkIn)}
            </Text>
          </View>

          <View className="w-6 items-center">
            <View className="w-6 h-0.5 bg-gray-200 rounded-sm" />
          </View>

          <View className="flex-1 bg-gray-100 rounded-xl p-4 items-center">
            <Text className="text-xs font-medium text-gray-500 mb-1">Check-out</Text>
            <Text className={`text-base font-semibold ${checkOut ? 'text-gray-900' : 'text-gray-400'}`}>
              {formatDate(checkOut)}
            </Text>
          </View>
        </View>

        {/* Month Navigator */}
        <View className="flex-row items-center justify-between px-5 py-4">
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
        </View>

        {/* Weekday Headers */}
        <View className="flex-row px-4 pb-2">
          {WEEKDAYS.map((day) => (
            <Text key={day} className="flex-1 text-center text-xs font-semibold text-gray-500 uppercase">
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap px-3">
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
        </View>

        {/* Nights Info */}
        {checkIn && checkOut && (
          <View className="items-center py-5">
            <Text className="text-sm font-semibold text-secondary">
              {getNights()} {getNights() === 1 ? 'night' : 'nights'} selected
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View
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
              ? `Continue · ${getNights()} ${getNights() === 1 ? 'night' : 'nights'}`
              : 'Select dates'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
