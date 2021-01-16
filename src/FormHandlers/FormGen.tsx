import { IFieldSpecs, IFormSpecs, TErrors, TUpdateState } from './Interfaces';
import React, { useState } from 'react';
import { capitalize, capitalizeName } from '../Utils';

import ReactTooltip from 'react-tooltip';
import { sendMessage } from '../Components/Handlers/UseSubject';
// import { userFormSpecs } from './FormSpecs';
import { useForm } from 'react-hook-form';

const disabledMsg = 'Disabled until form becomes valid';
const err = (errors: TErrors, fd: IFieldSpecs, setTooltipText: () => void) => {
	if (errors[fd.name] instanceof Object) {
		setTooltipText();
		return (
			<div className={fd.group ? 'error-msg-frame' : 'error-msg'}>
				{capitalize(errors[fd.name].message)}
			</div>
		);
	}
};
export interface IFormProps {
	formSpecs: (
		onSubmit: any,
		state?: any,
		updateState?: TUpdateState
	) => IFormSpecs;
	onSubmit: (value: object) => void;
	state?: any;
	updateState?: TUpdateState;
}
// ------ FORM GENERATOR --------
export const FormGen: React.FC<IFormProps> = ({
	formSpecs,
	onSubmit,
	state,
	updateState,
}): JSX.Element => {
	const formDef: IFormSpecs = formSpecs(onSubmit, state, updateState);
	const [msg, setMsg] = useState<string>(disabledMsg);
	const { register, handleSubmit, errors, formState } = useForm({
		mode: 'onChange',
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});
	const setTooltip = () => {
		const str = formState.isValid ? '' : disabledMsg;
		if (msg !== str) {
			setMsg(str);
		}
	};
	const defineGroup = (fd: IFieldSpecs) => {
		return (
			<div className={`${fd.type}-group-frame`} title={capitalize(fd.name)}>
				{err(errors, fd, setTooltip)}

				<div className='form-control'>
					{fd.group?.map((label, ix) => (
						<div className={`li-${fd.type}`}>
							<label htmlFor={label}>
								{capitalizeName(label)}
								<input
									type={fd.type}
									id={label}
									name={fd.name}
									value={label}
									ref={register(fd.registerBody)}
								/>
							</label>
						</div>
					))}
				</div>
			</div>
		);
	};
	const htmlTypeEl = (fd: IFieldSpecs): JSX.Element => {
		const attrs: any = {
			id: fd.id || fd.name,
			type: fd.type,
			name: fd.name,
			ref: register(fd.registerBody),
		};
		if (fd.placeholder) attrs.placeholder = fd.placeholder;
		if (fd.className) attrs.className = fd.className;
		if (fd.onChange) {
			attrs.onChange = updateState;
			attrs.value = state[fd.name];
		}
		return React.createElement(fd.htmlType, attrs);
	};
	return (
		<>
			<form
				id={formDef.formId}
				onSubmit={handleSubmit(onSubmit)}
				className={formDef.className}
			>
				<div className='form-control'>
					{formDef.fieldDefs.map((fd, ix) => {
						const el = htmlTypeEl(fd);
						if (fd.group) {
							return defineGroup(fd);
						} else if ('radio checkbox'.includes(fd.type)) {
							return (
								<div className='form-control' key={fd.name}>
									<label
										htmlFor={fd.name}
										className='label-radio-checkbox-line'
									>
										<div style={{ display: 'inline-block', width: '15.5rem' }}>
											{errors[fd.name]
												? err(errors, fd, setTooltip)
												: capitalizeName(fd.name)}
										</div>
										{el}
									</label>
								</div>
							);
						} else {
							return (
								<div className='form-control' key={fd.name}>
									{errors[fd.name] ? (
										err(errors, fd, setTooltip)
									) : (
										<label htmlFor={fd.name} className='label-wrapper'>
											<span>
												{errors[fd.name]
													? err(errors, fd, setTooltip)
													: capitalizeName(fd.name)}
											</span>
										</label>
									)}
									{el}
								</div>
							);
						}
					})}
				</div>
				<div
					onMouseOver={setTooltip}
					data-tip={msg}
					className='tooltip-wrapper'
				>
					<button
						className='submit-button'
						type='submit'
						form='testForm'
						disabled={!formState.isValid}
					>
						save
					</button>
				</div>
				<button
					className='reg-button'
					onClick={() => sendMessage({ showRegistrationForm: false })}
				>
					back
				</button>
			</form>
			<ReactTooltip className='tooltip' />
		</>
	);
};
