import React from 'react';
import { Formik, useFormikContext, useField } from 'formik';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Yup from 'yup';

const MyInput = ({ fieldName, ...props }) => {
  const [field,meta] = useField(fieldName);
  return (
    <>
    <TextInput onBlur={field.onBlur(fieldName)} style={styles.input} onChangeText={field.handleChange('email')} value={field.value} {...props} />
    {meta.error && meta.touched &&(
      <Text style={{color:'red'}} >{meta.error}</Text>
    )}
    </>
  )
}

const EmailForm = () => {
  const { submitForm } = useFormikContext();
  return (
    <>
      <Text>Correo electronico</Text>
      <MyInput fieldName="email" />
      <MyInput fieldName="name" />
      <Button onPress={submitForm} title="Enviar" />
    </>
  )
}

export default function App() {
  return (
    <View style={styles.container} >
      <Formik
        onSubmit={x => console.log(x)}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Correo invalido')
            .required('Requerido'),
          name: Yup.string()
            .min(10)
            .required('Requerido'),
        })}
        initialValues={{ email: '' }}
      >
        <EmailForm />
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 12,
    width: 150,
    backgroundColor: '#eee'
  }
});
