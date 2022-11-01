import { useAppSelector } from './redux-implements/create-async-thunk';

function App() {
  const { offers, isLoading, error } = useAppSelector(state => state.data);
  if (isLoading) {
    return (<h1>Loading...</h1>);
  }
  return (
    <>
      <h1>Hello World!</h1>
      {error && <h1>{`Something went wrong: ${error}`}</h1>}
      <p>{`${offers}`}</p>
    </>
  );
}

export default App;
