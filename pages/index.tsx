import { FC } from "react"
import Link from 'next/link'

const Home: FC = () => {

    return (
        <>
        <div>something about countries</div>
        <Link href="/countries">Checkout countries!</Link>
    </>
    )
}

export default Home
