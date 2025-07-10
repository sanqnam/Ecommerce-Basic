const Subscribe = () => {
    return (
        <div className="bg-white py-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-6">
                <div>
                    <h3 className="text-xl font-semibold italic text-gray-800">LET'S BE FRIENDS!</h3>
                    <p className="text-sm italic text-gray-400">Nisi nisi tempor consequat laboris nisi.</p>
                </div>

                <form className="flex w-full md:w-auto">
                    <input type="email" placeholder="Enter your email address" className="border border-gray-300 px-4 py-3 w-full md:w-96 text-sm text-gray-700 focus:outline-none" />
                    <button type="submit" className="bg-gray-800 text-white px-6 py-3 text-sm font-semibold hover:bg-gray-700 transition">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

    )
}
export default Subscribe