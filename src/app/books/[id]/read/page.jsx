import NavBar from '@/components/NavBar'

export default function ReadBook({ params }) {

    return (
        <>
            <NavBar />
            <h1>Leer el libro {params.id}</h1>
        </>
    )

}