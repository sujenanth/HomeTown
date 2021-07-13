import * as React from "react"

function Tails(props) {
    return (
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width={120}
            height={120}
            viewBox="0 0 120 120"
            {...props}
        >
            <title>{"heads"}</title>
            <path
                d="M114.6 60a54.612 54.612 0 01-102 27.108 53.8 53.8 0 01-5.988-15.612A54.945 54.945 0 015.4 60 54.63 54.63 0 0173.284 7.032a53.66 53.66 0 0115.384 6.504A54.626 54.626 0 01114.6 60z"
                fill="#ffde50"
            />
            <path
                d="M105 60a44.984 44.984 0 01-42.684 44.94h-.036A47.77 47.77 0 0160 105a45.003 45.003 0 01-7.716-89.34h.036A44.99 44.99 0 01105 60z"
                fill="#f68e00"
            />
            <path
                d="M99.6 60.6a44.996 44.996 0 01-37.284 44.34h-.036A47.77 47.77 0 0160 105a45.003 45.003 0 01-7.716-89.34h.036a47.77 47.77 0 012.28-.06 44.986 44.986 0 0145 45z"
                fill="#faa300"
            />
            <path
                d="M99.804 22.596l-6.78 6.78-3.096 3.096-60.552 60.552-6.78 6.78A54.42 54.42 0 0113.8 88.308a53.8 53.8 0 01-5.988-15.612A54.945 54.945 0 016.6 61.2 54.63 54.63 0 0174.484 8.232a53.66 53.66 0 0115.384 6.504 54.368 54.368 0 019.936 7.86z"
                fill="#fff"
                opacity={0.14}
            />
            <g
                fontSize={21.073}
                fontFamily="Roboto-Bold,Roboto"
                fontWeight={700}
                letterSpacing="-.015em"
            >
                <text transform="translate(28.097 67.959)" fill="#b96b00">
                    {"T"}
                    <tspan x={12.729} y={0} letterSpacing=".044em">
                        {"AILS"}
                    </tspan>
                </text>
                <text transform="translate(29.297 69.159)" fill="#ffea94">
                    {"T"}
                    <tspan x={12.729} y={0} letterSpacing=".044em">
                        {"AILS"}
                    </tspan>
                </text>
            </g>
        </svg>
    )
}

export default Tails
