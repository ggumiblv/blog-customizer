import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	setFormState: Dispatch<SetStateAction<ArticleStateType>>;
	setFormStateFinal: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
	setFormStateFinal,
}: ArticleParamsFormProps) => {

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: (newValue) => setIsMenuOpen(newValue),
	});

	const handleOptionChange = (type: keyof ArticleStateType) => (value: OptionType) => {
		setFormState((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const toggleForm = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		setFormStateFinal(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setFormStateFinal(formState);
		toggleForm();
	};

	const stopPropagation = (event: React.MouseEvent) => {
		event.stopPropagation();
	};


	return (
		<div ref={rootRef} onClick={stopPropagation}>
				<ArrowButton onClick={toggleForm} isOpen={isMenuOpen} />
				{isMenuOpen && (
					<aside
						className={clsx(
							styles.container,
							isMenuOpen && styles.container_open
						)}>
					<form  className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleOptionChange('fontFamilyOption')}
							title='Шрифт'
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleOptionChange('fontSizeOption')}
							title='Размер шрифта'
						/>

						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleOptionChange('fontColor')}
							title='Цвет шрифта'
						/>
						<Separator />

						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleOptionChange('backgroundColor')}
							title='Цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleOptionChange('contentWidth')}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset'  />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			)}
			</div>
	);
};
