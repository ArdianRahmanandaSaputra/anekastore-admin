const Navbar = () => {
    return(
        <div className="flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
            <div className="flex-none w-56 flex flex-row items-center">
                <strong className="capitalize ml-1 flex-1">Dashboard</strong>

                <button id="sliderBtn" className="flex-none text-right text-gray-900 hidden md:block">
                    <i className="fad fa-list-ul"></i>
                </button>
            </div>
        </div>
    )
}

export default Navbar;