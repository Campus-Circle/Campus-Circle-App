import axios from 'axios'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function Placement({id,data}) {
    return (
        <div className="w-full md:ml-28">

            <div className="font-body pl-5">
                <h1 className="text-3xl py-5 text-primary border-b">
                    Placements
                </h1>
                <p className="text-primary p-2 text-xl">
                    {id}
                </p>
            </div>

            <ReactMarkdown 
            className="placement-table"
                remarkPlugins={[remarkGfm]}
                children={data}
            />
        </div>
    )
}

export default Placement

export async function getServerSideProps(context) {
    const { id } = context.query;

    const {data} = await axios.get(`${process.env.URL}/placements/${id}.md`);

    return {
        props: {
            "data" : data,
            "id" : id
        }
    }
}