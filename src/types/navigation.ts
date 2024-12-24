import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, "Register">;
export type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;
