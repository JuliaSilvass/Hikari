# 🌸 Hikari

**Hikari** é um aplicativo mobile desenvolvido em **React Native (Expo)** com integração ao **Firebase** (Authentication e Firestore).  
O app funciona como um **catálogo de animes**, onde o usuário pode cadastrar, listar, editar e excluir **Animes**, **Estúdios** e **Personagens**, mantendo todas as informações salvas na nuvem.

---

## Tecnologias Utilizadas

- **React Native (Expo)**
- **TypeScript**
- **Firebase Authentication**
- **Firebase Firestore**
- **React Navigation**
- **React Native Toast Message**
- **@react-native-picker/picker**
- **@react-native-community/datetimepicker**

---

## Configuração do Ambiente

1. **Instalar dependências**
   ```bash
   npm install

2. Criar o arquivo .env

    * Renomeie o arquivo PREENCHER.env para .env

    * Substitua os valores pelos do seu projeto Firebase:

    ```env 
    FIREBASE_API_KEY=seu_api_key
    FIREBASE_AUTH_DOMAIN=seu_auth_domain
    FIREBASE_PROJECT_ID=seu_project_id
    FIREBASE_STORAGE_BUCKET=seu_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
    FIREBASE_APP_ID=seu_app_id
    ```
3. Executar o projeto

```npm 
npx expo start
```
