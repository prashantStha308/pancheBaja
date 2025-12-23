const VinylDisc = ({ size = 124 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 124 124" fill="none">
            <mask id="mask0_66_134" style={{ maskType: 'alpha' }}  maskUnits="userSpaceOnUse" x="0" y="0" width="124" height="124">
                <circle cx="62" cy="62" r="62" fill="#373737"/>
                <circle cx="62" cy="62" r="18" fill="#696969"/>
            </mask>
            <g mask="url(#mask0_66_134)">
                <circle cx="62" cy="62" r="62" fill="#404040"/>
                <circle cx="62" cy="62" r="18" fill="#696969"/>
                <rect x="86.8995" y="83" width="7" height="14" transform="rotate(45 86.8995 83)" fill="#696969"/>
                <rect x="83.5118" y="96.064" width="2.44017" height="1.06388" transform="rotate(45 83.5118 96.064)" fill="#696969"/>
                <path d="M88.5001 84.5L108.5 64.5C108.833 64.1667 109.4 63 109 61C108.6 59 108.833 33.5 109 21" stroke="#696969"/>
                <path d="M89.5001 86L110 65.5C110.333 65.1667 110.9 64 110.5 62C110.1 60 110.333 34.5 110.5 22" stroke="#696969"/>
                <path d="M89.0001 85L109.5 64.5C109.833 64.1667 110.4 63 110 61C109.6 59 109.833 33.5 110 21" stroke="#696969"/>
                <line x1="89.6465" y1="85.6464" x2="110.647" y2="64.6464" stroke="#696969"/>
            </g>
        </svg>
    )
}

export default VinylDisc;