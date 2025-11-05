

const arr = [
    {
        title: 'Endless scalability',
        text: "Scalability without limits, enabling Al and Web3 applications to achieve unrestricted growth.",
        images: ""
    },
    {
        title: 'GPU Driver',
        text: "GPU miners deploy Al models,developers don't need to manage or maintain them.",
        images: ""
    },
    {
        title: 'Fluid Composability',
        text: "Developers can integrate effortlessly to build, link, and scale Al-powered Web3 applications with ease.",
        images: ""
    }
]
export default function Selector () {
    return (
        <div>
            <div>
                {
                    arr.map((item,idx) => (
                        <div key={idx}>
                            <div>{item.title}</div>
                            <div>{item.text}</div>
                        </div>
                    ))
                }
            </div>
            <div></div>
        </div>
    )
}