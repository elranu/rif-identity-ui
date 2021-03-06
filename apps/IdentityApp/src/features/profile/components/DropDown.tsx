import React, { useState, useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface singleItem {
  label: string;
  value: string;
}

interface DropDownProps {
  name: string;
  items: singleItem[];
  value: string;
  onChange: (text: string) => {};
}

const DropDown: React.FC<DropDownProps> = ({ name, items, value, onChange }) => {
  const { typography }: ThemeInterface = useContext(ThemeContext);
  const [localValue, setLocalValue] = useState(value);

  const onChangeLocal = (item: singleItem) => {
    setLocalValue(item.value);
    onChange(item.value);
  };

  return (
    <View>
      <Text style={typography.paragraph}>{name}</Text>
      <DropDownPicker
        items={items}
        defaultValue={localValue}
        containerStyle={styles.containerStyle}
        style={styles.style}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownStyle}
        onChangeItem={onChangeLocal}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 56,
  },
  style: {
    backgroundColor: '#f1f1f1',
    borderColor: '#919191',
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
  },
};

export default DropDown;
