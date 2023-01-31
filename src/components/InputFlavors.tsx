import React, { FC } from 'react';
import { Button, TextField } from '@mui/material';


interface Props {
	flavor: string;
	onChangeHandler: (value: number) => void;
	value: number;
	onAddHandler: () => void;
	onDecHandler: () => void;
	control?: any;

	register?: any;
}

const InputFlavors: FC<Props> = ({ flavor, value, onDecHandler, control, onChangeHandler, onAddHandler, register }) => {

	return (
		<div key={flavor} className='m-2 flex flex-row'>
			<Button type={'button'} className='m-2 self-center' name={flavor + 'dec'} onClick={onDecHandler} variant={'contained'}>-</Button>
			<div className='m-2 flex-col'>
				<TextField
					name={flavor}
					variant={'standard'}
					label={flavor}
					value={value}
					type={'number'}
					onChange={(event) => onChangeHandler(+event.target.value)}
				></TextField>
			</div>
			<Button type={'button'} className='m-2 self-center' name={flavor + 'inc'} onClick={onAddHandler} variant={'contained'}>+</Button>
		</div>
	);
};

export default InputFlavors;