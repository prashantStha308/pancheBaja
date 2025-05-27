export default function Loader({ styles , height = "mih-h-96" }) {
		return (
			<div className={`${ styles ? styles + " " + height : "flex justify-center items-center min-h-96 z-50" + height }`} >
				<div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-gray-700  border-r-red-primary rounded-full" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
}