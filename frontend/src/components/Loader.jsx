export default function Loader({ styles }) {
		return (
			<div className={`${ styles ? styles : "flex justify-center items-center min-h-96 -z-50 "}`} >
				<div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-gray-700  border-r-red-primary rounded-full" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
}