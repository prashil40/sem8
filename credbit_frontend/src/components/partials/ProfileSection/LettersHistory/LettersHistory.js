import classes from './LettersHistory.module.css';
import { getClientLetters } from '../../../core/helpers/LetterApiCall';
import { useState } from 'react';
import { useEffect } from 'react';
import LetterHistoryItem from './LetterHistoryItem/LetterHistoryItem';

const preprocessLetters = (data) => {
	let newData = {};
	data.forEach((letter) => {
		letter.created_at = letter.created_at.split('T')[0];
		if (newData[letter.created_at]) {
			newData[letter.created_at].push(letter);
		} else {
			newData[letter.created_at] = [letter];
		}
	});

	return newData;

	// return Object.keys(newData).sort((a, b) => {
	//   return new Date(a) > new Date(b)
	// }).reduce(
	//   (obj, key) => {
	//     obj[key] = newData[key];
	//     return obj;
	//   },
	//   {}
	// );
};

const LettersHistory = () => {
	let [letters, setLetters] = useState({});
	let [error, setError] = useState(false);
	useEffect(() => {
		let id = JSON.parse(localStorage.getItem('token')).user._id;
		getClientLetters(id)
			.then((data) => {
				let newData = preprocessLetters(data);
				setLetters(newData);
			})
			.catch((err) => {
				setError(true);
				console.log(err);
			});
	}, []);

	return (
		<div>
			<form className='changepassword-form' name='changePasswordForm' id='changePasswordForm'>
				<div className='row'>
					<div className={`${classes.col_xl_12_header} mt-30`}>
						<h3>LETTERS HISTORY</h3>
						<hr style={{ margin: '10px 0px' }} />
					</div>
				</div>
				<div className='row'>
					{error && (
						<div className={classes.error}>
							<span>Something went wrong!</span>
						</div>
					)}

					{!error &&
						Object.entries(letters).map(([key, value]) => {
							return <LetterHistoryItem key={key} sentDate={key} letters={value} />;
						})}
				</div>
			</form>
		</div>
	);
};

export default LettersHistory;
