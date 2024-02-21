import dbQuery from "@/db/dbQuery"
import ResourceModel from "@/db/models/Resources"
import ResourcesPage from "./ResourcesPage"

export default async function Page ({params: {resourceType}}) {
    const { resourceTypes, resources } = await dbQuery(async () => {
        const resourceTypes = await ResourceModel.distinct('type').sort()
        const resources = await ResourceModel.find({
            type: resourceType
        }).sort('name')

        return {resourceTypes, resources}
    })
    return (
        <ResourcesPage resourceTypes={resourceTypes} resources={resources} resourceType={resourceType} />
    )
}