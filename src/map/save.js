// import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import GoogleMap from './googlemap';


export default function save({ attributes }) {
	const { id, location, zoom, type, deskHeight} =
		attributes;
	return (
		<div {...useBlockProps.save()}>
			<GoogleMap
				location={location}
				zoom={zoom}
				type={type}
				height={deskHeight}
				className={`emb__height_${id}`}
			/>
		</div>
	);
}
