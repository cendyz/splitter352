import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { tipBtns, containerData } from './data'

const App = () => {
	const [inputs, setInputs] = useState({
		bill: '',
		people: '',
	})
	const [billValue, setBillValue] = useState('')
	const [billError, setBillError] = useState(false)
	const [peopleValue, setPeopleValue] = useState('')
	const [tipValue, setTipValue] = useState('')
	const [customValue, setCustomValue] = useState('')
	const [error, setError] = useState(false)

	const handleBill = e => {
		let input = e.target.value
		input = input.replace(/[^0-9.]/g, '')
		const parts = input.split('.')
		if (parts.length > 2) {
			input = parts[0] + '.' + parts[1]
		}

		if (!isNaN(parseFloat(input)) && isFinite(input)) {
			setBillValue(parseFloat(input))
		}

		setInputs({ ...inputs, bill: input })

		if (parseFloat(input) === 0) {
			setBillError(true)
		} else {
			setBillError(false)
		}
	}

	const handlePeople = e => {
		let input = e.target.value
		input = input.replace(/[^0-9]/g, '')

		let inputNum = parseInt(input)
		if (inputNum <= 0) {
			setError(true)
		} else {
			setError(false)
		}

		setInputs({ ...inputs, people: input })
	}

	const handleTip = value => {
		console.log(value);
	}

	const handleCustomTip = e => {
		let input = e.target.value
	}

	return (
		<>
			<header className='header'>
				<h1 className='header-title'>splitter</h1>
			</header>
			<main className='main'>
				<section className='one-box'>
					<div className='inner-first'>
						<label htmlFor='bill' className='mini-title'>
							Bill
						</label>
						<div
							className={
								billError
									? 'input-container people-error-border '
									: 'input-container'
							}>
							<span className='input-dollar'>$</span>
							<input
								type='text'
								className={billError ? 'input error-input' : 'input'}
								id='bill'
								value={inputs.bill}
								onChange={handleBill}
								placeholder='0'
								name='bill'
							/>
						</div>
					</div>
					<div className='inner-second'>
						<label htmlFor='tip' className='mini-title'>
							Select Tip %
						</label>
						<div className='btns'>
							{tipBtns.map(({ value, text }) => {
								return (
									<button
										className='tip-btn'
										key={nanoid()}
										value={value}
										onClick={() => handleTip(value)}
										>
										{text}%
									</button>
								)
							})}
							<input
								type='text'
								className='input tip-input'
								id='tip'
								placeholder='Custom'
							/>
						</div>
					</div>
					<div className='inner-three'>
						<label
							htmlFor='people'
							className='mini-title people-title-box'>
							Number of People
							{error && (
								<span className='people-error'>Can't be zero</span>
							)}
						</label>
						<div
							className={
								error
									? 'input-container people-error-border'
									: 'input-container '
							}>
							<img src='src/images/icon-person.svg' alt='Person icon' />
							<input
								type='text'
								className={error ? 'input error-input' : 'input'}
								id='bill'
								onChange={handlePeople}
								placeholder='0'
							/>
						</div>
					</div>
				</section>
				<section className='second-box'>
					{containerData.map(({ upText }, index) => {
						return (
							<div className='container' key={nanoid()}>
								<div className='left-container'>
									<h2 className='left-up-text'>{upText}</h2>
									<p className='left-down-text'>/ person</p>
								</div>
								<p className='price'>$0.00</p>
							</div>
						)
					})}
					<button className='reset-btn'>reset</button>
				</section>
			</main>
		</>
	)
}
export default App
