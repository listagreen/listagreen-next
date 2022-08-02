import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { api } from "../services/api";

export default function CreateCompany() {
  return (
    <Box>
      <Heading size="lg" fontWeight="normal">
        Cadastrar empresa
      </Heading>
      <Formik
        initialValues={{
          companyName: "",
          members: "",
          profile: {
            category: "",
            info: "",
            contact: {
              email: "",
              phone: "",
              whatsapp: "",
              web: "https://",
              address: {
                street: "",
                number: "",
                complement: "",
                neighborhood: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
              },
            },
          },
          fieldOfWork: "",
        }}
        onSubmit={(values, actions) => {
          const { companyName, profile, fieldOfWork } = values;
          const member = {
            id: "123",
            is_owner: true,
            is_admin: true,
            is_staff: false,
            is_superuser: true,
          };

          console.log(values);

          api.post("/api/companies/create", {
            companyName,
            fieldOfWork,
            member,
            profile,
          });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.companyName}
              name="companyName"
              required
            >
              {({ field }) => (
                <Input
                  size="lg"
                  id="companyName"
                  placeholder="Nome da empresa"
                  focusBorderColor="listagreen.basegreen"
                  errorBorderColor="red.300"
                  {...field}
                />
              )}
            </Field>
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.members}
              name="members"
              placeholder="Membros"
              focusBorderColor="listagreen.basegreen"
              required
            />

            <Heading size="md">Perfil</Heading>

            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.category}
              name="profile.category"
              placeholder="Categoria"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.info}
              name="profile.info"
              placeholder="Bio da empresa"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.fieldOfWork}
              name="fieldOfWork"
              placeholder="Área de atuação"
              focusBorderColor="listagreen.basegreen"
              required
            />

            <Heading size="sm">Contato</Heading>

            <Input
              type="email"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.email}
              name="profile.contact.email"
              placeholder="Email"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="tel"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.phone}
              name="profile.contact.phone"
              placeholder="Telefone"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="tel"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.whatsapp}
              name="profile.contact.whatsapp"
              placeholder="WhatsApp"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="url"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.web}
              name="profile.contact.web"
              placeholder="Site da empresa"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Heading size="sm">Endereço</Heading>
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.street}
              name="profile.contact.address.street"
              placeholder="Rua"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="number"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.number}
              name="profile.contact.address.number"
              placeholder="Número"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.complement}
              name="profile.contact.address.complement"
              placeholder="Complemento"
              focusBorderColor="listagreen.basegreen"
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.neighborhood}
              name="profile.contact.address.neighborhood"
              placeholder="Bairro"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.city}
              name="profile.contact.address.city"
              placeholder="Cidade"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.state}
              name="profile.contact.address.state"
              placeholder="Estado"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.country}
              name="profile.contact.address.country"
              placeholder="País"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Input
              type="text"
              size="lg"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.profile.contact.address.zipCode}
              name="profile.contact.address.zipCode"
              placeholder="CEP"
              focusBorderColor="listagreen.basegreen"
              required
            />
            <Button type="submit">Enviar</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}
