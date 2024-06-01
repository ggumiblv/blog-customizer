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
	onSubmit: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: () =>  setIsMenuOpen(true),
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
		onReset();
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit();
		toggleForm(); 
	};


	return (
		<>
		<div ref={rootRef}>
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
		</>
	);
};
