export default function Input( {type = "text", name, placeholder} ) {
    return (
        <input name={name} type={type} placeholder={placeholder} className="mx-4 rounded-lg text-lg shadow-xl p-2 focus:outline-violet-600 focus:border-violet-600 focus:ring-violet-600 w-1/4" />
    );
}