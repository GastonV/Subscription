import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { initFlavors, subscriptions } from './data/constants';
import { FlavorsType } from './types/FlavorsType';
import InputFlavors from './components/InputFlavors';

function App() {
	const [subscription, setSubscription] = useState(0);
	const [flavors, setFlavors] = useState(initFlavors);
	const [formData, setFormData] = useState({} as any)

	useEffect(() => {
		console.log(formData, "formData")
	}, [formData])
	const onSubmit = () => {
		setFormData(flavors);
	};

	const increment = (flavor: FlavorsType) => {
		if (flavors[flavor] >= subscription) return;
		setFlavors({ ...flavors, [flavor]: flavors[flavor] + 1 })
	}

	const decrement = (flavor: FlavorsType) => {
		if (flavors[flavor] <= 0) return;
		setFlavors({ ...flavors, [flavor]: flavors[flavor] - 1 })
	}
	const selectSubscription = (value: number) => {
		setSubscription(value);
		setFlavors({
			Chocolate: value / subscriptions.length,
			Vanilla: value / subscriptions.length,
			Strawberry: value / subscriptions.length
		})
	};

	return (
		<>
			<div className='flex flex-row'>
				{
					subscriptions.map((item, index) =>
						<div key={item} className='m-2'>
							<Button onClick={event => selectSubscription(item)}
											variant={'contained'}>
								<div>Subscription of</div>
								<div>{item}</div>
							</Button>
						</div>
					)
				}
			</div>


			<form onSubmit={(event) => {
				event.preventDefault();
				onSubmit();
			}}>
				{
					subscription===0 ? <></> : Object.keys(flavors).map((item, index) =>
						<div key={item + 1} className='m-2'>
							<InputFlavors
								flavor={item}
								onAddHandler={() => increment(item as FlavorsType)}
								onDecHandler={() => decrement(item as FlavorsType)}
								value={flavors[item as FlavorsType]}
								onChangeHandler={value => setFlavors({ ...flavors, [item]: value })}
							/>
						</div>)
				}
				{
					subscription===0 ? <></> :
					<Button className={'m-2'} variant={'contained'} type={'submit'}>Submit</Button>
				}

			</form>
		</>
	);
}

export default App;
