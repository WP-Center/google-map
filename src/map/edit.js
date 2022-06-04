import {
	InspectorControls, useBlockProps
} from '@wordpress/block-editor';
import { Button, ButtonGroup, PanelBody, RadioControl, RangeControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
// editor style
import './editor.scss';
import GoogleMap from './googlemap';
const { Fragment } = wp.element;

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		id,
		location,
		zoom,
		type,
		deskHeight,
		tabHeight,
		mobileHeight,
		device,
	} = attributes;

	// set unique id
	setAttributes({
		id: clientId.slice(0, 8),
	})

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Map Settings', 'embed-maps-block')}>
					<TextareaControl
						label={__('Location Name', 'embed-maps-block')}
						value={location}
						onChange={(place) => setAttributes({ location: place })}
						placeholder={__('Enter a location', 'embed-maps-block')}
					/>
					<RangeControl
						label={__('Zoom Level', 'embed-maps-block')}
						beforeIcon="search"
						value={zoom}
						onChange={(value) => setAttributes({ zoom: value })}
						min={1}
						max={22}
					/>
					<RadioControl
						label={__('Map Type', 'embed-maps-block')}
						selected={type}
						options={[
							{
								label: __('Roadmap', 'embed-maps-block'),
								value: 'm',
							},
							{
								label: __('Satellite', 'embed-maps-block'),
								value: 'k',
							},
						]}
						onChange={(value) => {
							setAttributes({ type: value });
						}}
					/>
					<ButtonGroup
						style={{ marginBottom: '10px', float: 'right' }}
					>
						<Button
							isSmall={true}
							isPressed={device === 'desktop'}
							onClick={() =>
								setAttributes({
									device: 'desktop',
								})
							}
						>
							<span className="dashicons dashicons-desktop"></span>
						</Button>
						<Button
							isSmall={true}
							isPressed={device === 'tablet'}
							onClick={() =>
								setAttributes({
									device: 'tablet',
								})
							}
						>
							<span className="dashicons dashicons-tablet"></span>
						</Button>
						<Button
							isSmall={true}
							isPressed={device === 'mobile'}
							onClick={() =>
								setAttributes({
									device: 'mobile',
								})
							}
						>
							<span className="dashicons dashicons-smartphone"></span>
						</Button>
					</ButtonGroup>
					{device === 'desktop' && (
						<RangeControl
							label={__('Map Height', 'embed-maps-block')}
							beforeIcon="desktop"
							value={deskHeight}
							onChange={(height) =>
								setAttributes({ deskHeight: height })
							}
							min={1}
							max={2000}
						/>
					)}
					{device === 'tablet' && (
						<RangeControl
							label={__('Map Height', 'embed-maps-block')}
							beforeIcon="tablet"
							value={tabHeight}
							onChange={(height) =>
								setAttributes({ tabHeight: height })
							}
							min={1}
							max={2000}
						/>
					)}
					{device === 'mobile' && (
						<RangeControl
							label={__('Map Height', 'embed-maps-block')}
							beforeIcon="smartphone"
							value={mobileHeight}
							onChange={(height) =>
								setAttributes({ mobileHeight: height })
							}
							min={1}
							max={2000}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<GoogleMap
					location={location}
					zoom={zoom}
					type={type}
					height={deskHeight}
					className={`emb__height_${id}`}
				/>
			</div>
		</Fragment>
	);
}
