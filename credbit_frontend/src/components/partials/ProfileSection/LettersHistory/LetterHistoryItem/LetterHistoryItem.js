import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import classes from './LetterHistoryitem.module.css';

const LetterHistoryItem = ({ sentDate, letters }) => {
	const [titles, setTitles] = useState([]);
	useEffect(() => {
		letters.forEach((letter) => {
			fetch(letter.letter_url)
				.then((response) => response.json())
				.then((data) => {
					setTitles([...titles, data.title]);
				})
				.catch((err) => console.error(err));
		});
	}, []);

	const displayTitles = titles.map((title, index) => <li key={index}>{title}</li>);

	return (
		<section className={classes.history_item}>
			<strong>
				<span className={classes.sent_date}>Sent Date : {sentDate}</span>
			</strong>
			<section>
				<ul>{displayTitles}</ul>
			</section>
		</section>
	);
};

export default LetterHistoryItem;
