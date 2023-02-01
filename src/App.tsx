import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { initFlavors, subscriptions } from './data/constants';
import { FlavorsType } from './types/FlavorsType';
import InputFlavors from './components/InputFlavors';
import axios from 'axios';
import { FormInputs } from './types/InputType';

const URL = "https://eo948ohkp6qvq4j.m.pipedream.net";

function App() {
	const [subscription, setSubscription] = useState(0);
	const [flavors, setFlavors] = useState(initFlavors);
	const [formData, setFormData] = useState<FormInputs>();


	const totalFlavors = (): boolean => {
		const total = Object.values(flavors).reduce((a, b) => a + b, 0);
		return total > subscription || total < subscription;
	}

	useEffect(() => {
		if (!formData) return;
		if (totalFlavors()) {
			window.alert('Total flavors must be equal to subscription')
			return;
		}
		const stringifiesPayload = JSON.stringify(formData);
		axios.post(URL, stringifiesPayload).then((response) => {
			console.log(response.data)
		});
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
		<div className="flex self-center flex-col">
			<div className='flex flex-row'>
				{
					subscriptions.map((item) =>
						<div key={item} className='m-2'>
							<Button onClick={() => selectSubscription(item)}
											variant={'contained'}>
								<div>Subscription of {item}</div>
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
					subscription===0 ? <></> : Object.keys(flavors).map((item) =>
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
						<Button className={'m-2 flex self-center'} variant={'contained'} type={'submit'}>Submit</Button>
				}

			</form>
		</div>
	);
}

export default App;
