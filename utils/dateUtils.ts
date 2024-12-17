// src/utils/dateUtils.ts

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    });
  };
  
  // Format date to a readable string
  export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };
  