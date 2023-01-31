import React, { useState } from 'react';
import './App.css';
import { Button, Input } from '@mui/material';

const subscriptions = [15, 30, 60];

type FlavorsType = 'Vanilla' | 'Chocolate' | 'Strawberry';

const initFlavors = {
	'Vanilla': 0,
	'Chocolate': 0,
	'Strawberry': 0,
}

function App() {
	const [subscription, setSubscription] = useState(0);
	const [flavors, setFlavors] = useState(initFlavors);
	const selectSubscription = (value: number) => {
		setSubscription(value);
		setFlavors({
			Chocolate: value / subscriptions.length,
			Vanilla: value / subscriptions.length,
			Strawberry: value / subscriptions.length
		})
		console.log(value);
	};

	const increment = (flavor: FlavorsType) => {
		setFlavors({ ...flavors, [flavor]: flavors[flavor] + 1 })
	}

	const decrement = (flavor: FlavorsType) => {
		setFlavors({ ...flavors, [flavor]: flavors[flavor] - 1 })
	}

	return (
		<>
			{
				subscriptions.map((item, index) =>
					<Button onClick={event => selectSubscription(item)} key={item}
							variant={'contained'}>{item}</Button>)
			}
			{
				subscription===0 ? <></> : Object.keys(flavors).map((item, index) => {
					return <div key={item}>
						<Input value={flavors[item as FlavorsType]} onChange={(event) => {
							setFlavors({ ...flavors, [item]: Number(event.target.value) })
						}} type={'number'}></Input>
						<Button name={item + 'inc'} onClick={() => decrement(item as FlavorsType)} variant={'contained'}>-</Button>
						<Button name={item + 'dec'} onClick={() => increment(item as FlavorsType)} variant={'contained'}>+</Button>
					</div>
				})
			}
		</>
	);
}

export default App;
