import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // layout geral
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    justifyContent: 'flex-start', 
    padding: 24,
},

  // títulos e textos
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ec407a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  text: {
    color: '#333',
  },

  // inputs
  input: {
    width: '100%',
    backgroundColor: '#fce4ec',
    padding: 12,
    borderRadius: 8,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f8bbd0',
  },

  // botão principal
  button: {
    backgroundColor: '#ec407a',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  // links (ex: "já tenho conta")
  link: {
    color: '#d81b60',
    marginTop: 15,
  },

  // cards de listagem (Home)
  card: {
    backgroundColor: '#fce4ec',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f8bbd0',
    width: '95%', 
    alignSelf: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  nome: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  info: { color: '#555', marginTop: 4 },

  // botão flutuante (+)
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ec407a',
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },

  // data de nascimento (input visual)
  dateBox: {
    width: '100%',
    backgroundColor: '#fce4ec',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f8bbd0',
    marginBottom: 15,
  },
  dateText: {
    color: '#555',
  },
});


