// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import colors from '../lib/styles/colors';

// interface DatePickerProps {
//   year: string;
//   month: string;
//   day: string;
//   onDateChange: (year: string, month: string, day: string) => void;
// }

// const DatePicker: React.FC<DatePickerProps> = ({
//   year,
//   month,
//   day,
//   onDateChange,
// }) => {
//   const generatePickerItems = (start: number, end: number): JSX.Element[] => {
//     const items: JSX.Element[] = [];
//     for (let i = start; i <= end; i++) {
//       const value = i < 10 ? `0${i}` : `${i}`;
//       items.push(<Picker.Item key={i} label={value} value={value} />);
//     }
//     return items;
//   };

//   return (
//     <View style={style.container}>
//       <View style={style.pickerContainer}>
//         <Picker
//           style={{width: 130}}
//           selectedValue={year}
//           onValueChange={(itemValue: string) =>
//             onDateChange(itemValue.toString(), month, day)
//           }>
//           {generatePickerItems(1900, 2100)}
//         </Picker>
//         <Text style={style.text}>년</Text>
//       </View>

//       <View style={style.pickerContainer}>
//         <Picker
//           style={{width: 130}}
//           selectedValue={month}
//           onValueChange={(itemValue: string) =>
//             onDateChange(year, itemValue.toString(), day)
//           }>
//           {generatePickerItems(1, 12)}
//         </Picker>
//         <Text style={style.text}>월</Text>
//         <Picker
//           style={{width: 130}}
//           selectedValue={day}
//           onValueChange={(itemValue: string) =>
//             onDateChange(year, month, itemValue.toString())
//           }>
//           {generatePickerItems(1, 31)}
//         </Picker>
//         <Text style={style.text}>일</Text>
//       </View>
//     </View>
//   );
// };

// export default DatePicker;

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontWeight: 'bold',
//     color: colors.navy,
//   },
// });
