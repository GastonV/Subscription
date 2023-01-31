import axios from 'axios';
import { FlavorsType } from '../types/FlavorsType';
import { Inputs } from '../types/InputType';
import { useState } from 'react';
export class FlavorService {

	private readonly flavors: FlavorsType[] = ['Vanilla', 'Chocolate', 'Strawberry'];
	private readonly baseURL: string = "https://jsonplaceholder.typicode.com/posts";
	sendSubscription(data: Inputs) {
		axios.post(this.baseURL, {
				title: "Hello World!",
				body: "This is a new post."
			})
			.then((response) => {
				setPost(response.data);
			});
	}
	getFlavors(): FlavorsType[] {
		return this.flavors;
	}


}