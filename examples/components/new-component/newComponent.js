import * as React from 'react';

import styles from './styles.css';

const NewComponent = () => {

	return (
		<div className="new-component">

			<p>directory.unformatted: new-component</p>
			<p>directory.camelCase: newComponent</p>
			<p>directory.constantCase: NEW_COMPONENT</p>
			<p>directory.paramCase: new-component</p>
			<p>directory.pascalCase: NewComponent</p>
			<p>directory.snakeCase: new_component</p>

			<p>name.formatted: newComponent</p>
			<p>name.camelCase: newComponent</p>
			<p>name.constantCase: NEW_COMPONENT</p>
			<p>name.paramCase: new-component</p>
			<p>name.pascalCase: NewComponent</p>
			<p>name.snakeCase: new_component</p>

			<p>extension: js</p>

		</div>
	);
};

export default NewComponent;