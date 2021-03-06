import React, { useState, useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, TouchableOpacity, Text, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface DatePickerProps {
  name: string;
  value: string | Date | null;
  onChange: (currentDate: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, value, onChange }) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [date, setDate] = useState(value ? new Date(value) : null);
  const [show, setShow] = useState(false);

  const onLocalChange = (_event: Event, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onChange(moment(currentDate).format('YYYY-MM-DD').toString());
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <Text style={typography.paragraph}>{name}</Text>
      <View>
        <TouchableOpacity style={[layout.textInput, styles.display]} onPress={showDatepicker}>
          <Text>{date ? moment(date).format('MMM D YYYY') : ''}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onLocalChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default DatePicker;
