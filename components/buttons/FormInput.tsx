import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import icons from "@/constants/icons";

interface FormInputProps {
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  [key: string]: any;
}

const FormInput = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormInputProps) => {
  return (
    <TextInput
      className="w-full font-Segoeui text-white rounded-xl flex flex-row justify-center items-center text-whit border border-secondary p-4 my-3 ${otherStyles}"
      value={value}
      placeholder={placeholder}
      placeholderTextColor={"#9e9e9e"}
      onChangeText={handleChangeText}
    />
  );
};

export default FormInput;
/* 
<TextInput
className="w-full rounded-xl flex flex-row justify-center items-center bg-gray-500 p-4 mb-3 mt-3 ${otherStyles}"
value={value}
placeholder={placeholder}
placeholderTextColor={"#9e9e9e"}
onChangeText={handleChangeText}
/> */
