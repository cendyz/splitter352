import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { tipBtns, containerData } from './data'
import personImg from './images/icon-person.svg'
import dollarImg from './images/icon-dollar.svg'

const App = () => {
	const [inputs, setInputs] = useState({
		bill: '',
		people: '',
		custom: '',
	})

	const [billValue, setBillValue] = useState('')
	const [billError, setBillError] = useState(false)

	const [tipValue, setTipValue] = useState('')

	const [peopleValue, setPeopleValue] = useState('')

	const [amountPerson, setAmountPerson] = useState('0.00')

	const [total, setTotal] = useState('0.00')

	const [activeButton, setActiveButton] = useState(null)
	const [error, setError] = useState(false)

	const [disabledButton, setDisabledButton] = useState(true)

	const handleBill = e => {
		let inputBill = e.target.value.replace(/[^0-9.]/g, '')
		const parts = inputBill.split('.')
		if (parts.length > 2) {
			inputBill = parts[0] + '.' + parts[1]
		} else if (parts[1]?.length > 2) {
			inputBill = parts[0] + '.' + parts[1].slice(0, 2)
		}

		setInputs({ ...inputs, bill: inputBill })

		let newNum = parseFloat(inputBill)

		setBillValue(newNum)

		if (parseFloat(inputBill) === 0) {
			setBillError(true)
		} else {
			setBillError(false)
		}
	}

	const handleTip = (value, index) => {
		setTipValue(value)
		setActiveButton(index)
	}

	const handleCustomTip = e => {
		let input = e.target.value.replace(/[^0-9]/g, '')
		let numInput = parseFloat(input)

		if (isNaN(numInput)) {
			numInput = ''
		}

		if (numInput > 100) {
			numInput = 100
		}

		const properNum = numInput / 100

		setTipValue(properNum)
		setInputs({ ...inputs, custom: numInput })
		setActiveButton(null)
	}

	const handlePeople = e => {
		let input = e.target.value.replace(/[^0-9]/g, '')

		let inputNum = parseInt(input)
		if (inputNum <= 0) {
			setError(true)
		} else {
			setError(false)
		}

		setInputs({ ...inputs, people: input })

		setPeopleValue(inputNum)
	}
	const handleTipAmount = () => {
		if (
			!isNaN(billValue) &&
			billValue > 0 &&
			!isNaN(tipValue) &&
			!isNaN(peopleValue) &&
			peopleValue > 0
		) {
			const sum = (billValue * tipValue) / peopleValue
			setAmountPerson(sum.toFixed(2))
			const sumTotal = billValue / peopleValue + sum
			setTotal(sumTotal.toFixed(2))
			setDisabledButton(false)
		} else {
			setAmountPerson('0.00')
			setTotal('0.00')
			setDisabledButton(true)
		}
	}

	const handleReset = () => {
		setInputs({
			bill: '',
			people: '',
			cutsom: '',
		})
		setBillValue('')
		setBillError(false)
		setTipValue('')
		setPeopleValue('')
		setAmountPerson('0.00')
		setActiveButton(null)
		setError(false)
	}

	useEffect(() => {
		handleTipAmount()
	}, [billValue, tipValue, peopleValue])

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
							<img src={dollarImg} alt='Dolar icon' />
							<input
								type='text'
								className={billError ? 'input error-input' : 'input'}
								id='bill'
								value={inputs.bill || ''}
								onChange={handleBill}
								placeholder='0'
								name='bill'
							/>
						</div>
					</div>
					<div className='inner-second'>
						<label htmlFor='custom' className='mini-title'>
							Select Tip %
						</label>
						<div className='btns'>
							{tipBtns.map(({ value, text }, index) => {
								return (
									<button
										className={`tip-btn ${
											activeButton === index ? 'active' : ''
										}`}
										key={nanoid()}
										value={value || ''}
										onClick={() => handleTip(value, index)}>
										{text}%
									</button>
								)
							})}
							<input
								type='text'
								className='input tip-input'
								id='custom'
								placeholder='Custom'
								onChange={handleCustomTip}
								value={inputs.custom || ''}
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
							<img src={personImg} alt='Person icon' />
							<input
								type='text'
								className={error ? 'input error-input' : 'input'}
								id='people'
								onChange={handlePeople}
								placeholder='0'
								value={inputs.people || ''}
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
								<p className='price'>
									${index === 1 ? total : amountPerson}
								</p>
							</div>
						)
					})}
					<button
						className={`reset-btn ${disabledButton ? 'disabled-btn' : ''}`}
						onClick={handleReset}>
						reset
					</button>
				</section>
			</main>
		</>
	)
}
export default App
