import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import icons from "@/constants/icons";

interface FormFieldProps {
  value: string;
  placeholder: string;
  underText: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  [key: string]: any;
}

const FormField = ({
  value,
  placeholder,
  underText,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-4">
      <View className=" flex-row w-full h-16 px-4 rounded-xl border border-white ${otherStyles}">
        <TextInput
          className="flex-1 text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#9e9e9e"} //Change here
          onChangeText={handleChangeText}
          secureTextEntry={placeholder === "Password" && !showPassword}
        />

        {placeholder === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 flex-1"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      <Text
        className="text-gray-300 font-light text-sm mt-1 mx-6"
        style={props.underTextStyle}
      >
        {underText}
      </Text>
    </View>
  );
};

export default FormField;
