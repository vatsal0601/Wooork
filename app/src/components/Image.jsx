import { useEffect, useState } from "react";
import { DownloadIcon } from "@heroicons/react/solid";

const Image = ({ fileError, file, setFile }) => {
	const [inputFile, setInputFile] = useState(null);
	const [inDraggableArea, setInDraggableArea] = useState(false);
	const [fileExtensionError, setFileExtensionError] = useState(false);

	useEffect(() => {
		if (!fileError && !fileExtensionError) setFile(inputFile);
	}, [inputFile, fileError, fileExtensionError, setFile]);

	const handleFile = (file) => {
		const fileExtension = /image\/*/;
		if (!fileExtension.test(file.type)) setFileExtensionError(true);
		else setFileExtensionError(false);
		setInputFile(file);
	};

	return (
		<>
			{(file === null || fileError || fileExtensionError) && (
				<div
					onDragOver={(e) => {
						e.preventDefault();
						setInDraggableArea(true);
					}}
					onDragLeave={(e) => {
						e.preventDefault();
						setInDraggableArea(false);
					}}
					onDrop={(e) => {
						e.preventDefault();
						handleFile(e.dataTransfer.files[0]);
					}}
					className={`h-40 sm:h-64 lg:h-96 flex flex-col items-center justify-center gap-3 border-2 ${
						fileExtensionError ? `border-red-600` : `border-blue-600`
					} ${!inDraggableArea ? `border-dashed` : ``} rounded-md`}>
					<DownloadIcon className="w-10 lg:w-16 h-10 lg:h-16 text-gray-400" />
					<p className="text-gray-400 lg:text-lg">
						Drag 'n' drop some files here or{" "}
						<label htmlFor="fileInput">
							<span className="text-blue-600 cursor-pointer focus:outline-none">click here</span>
							<input
								type="file"
								id="fileInput"
								accept="image/*"
								onChange={(e) => handleFile(e.target.files[0])}
								className="hidden"
							/>
						</label>
					</p>
					{fileExtensionError && <p className="text-red-600">You can only upload single image</p>}
				</div>
			)}
			{file && !fileExtensionError && !fileError && (
				<img src={URL.createObjectURL(file)} alt={file.name} className="object-cover rounded-md" />
			)}
		</>
	);
};

export default Image;
