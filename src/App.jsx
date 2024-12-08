import { useState } from 'react'
import { nanoid } from 'nanoid'
import { tipBtns, containerData } from './data'

const App = () => {
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
						<div className={'input-container'}>
							<span className='input-dollar'>$</span>
							<input type='text' className='input' id='bill' />
						</div>
					</div>
					<div className='inner-second'>
						<label htmlFor='tip' className='mini-title'>
							Select Tip %
						</label>
						<div className='btns'>
							{tipBtns.map(({ value }) => {
								return (
									<button
										className='tip-btn'
										value={{ value }}
										key={nanoid()}>
										{value}%
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
						<label htmlFor='people' className='mini-title people-title-box'>
							Number of People
							{/* <span className="people-error">Can't be zero</span> */}
						</label>
						<div className='input-container'>
							<img src='src/images/icon-person.svg' alt='Person icon' />
							<input type='text' className='input' id='bill' />
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
