import { client } from '../../../../lib/sanity.client'

// Get overview statistics for dashboard
export async function getOverviewStats() {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

  const sevenDaysAgoISO = sevenDaysAgo.toISOString()
  const fourteenDaysAgoISO = fourteenDaysAgo.toISOString()
  const thirtyDaysAgoISO = thirtyDaysAgo.toISOString()
  const sixtyDaysAgoISO = sixtyDaysAgo.toISOString()

  try {
    // Total leads
    const totalLeads = await client.fetch<number>(`count(*[_type == "lead"])`)

    // Total leads 7 days ago (for trend comparison)
    const totalLeads7dAgo = await client.fetch<number>(
      `count(*[_type == "lead" && _createdAt < $date])`,
      { date: sevenDaysAgoISO }
    )

    // New leads last 7 days
    const newLeads7d = await client.fetch<number>(
      `count(*[_type == "lead" && _createdAt >= $date])`,
      { date: sevenDaysAgoISO }
    )

    // New leads 7-14 days ago (for trend)
    const newLeads14d = await client.fetch<number>(
      `count(*[_type == "lead" && _createdAt >= $startDate && _createdAt < $endDate])`,
      { startDate: fourteenDaysAgoISO, endDate: sevenDaysAgoISO }
    )

    // Meetings last 7 days
    const meetings7d = await client.fetch<number>(
      `count(*[_type == "lead" && status == "meeting" && _updatedAt >= $date])`,
      { date: sevenDaysAgoISO }
    )

    // Meetings 7-14 days ago
    const meetings14d = await client.fetch<number>(
      `count(*[_type == "lead" && status == "meeting" && _updatedAt >= $startDate && _updatedAt < $endDate])`,
      { startDate: fourteenDaysAgoISO, endDate: sevenDaysAgoISO }
    )

    // Converted last 30 days
    const converted30d = await client.fetch<number>(
      `count(*[_type == "lead" && status == "converted" && convertedDate >= $date])`,
      { date: thirtyDaysAgoISO }
    )

    // Converted 30-60 days ago
    const converted60d = await client.fetch<number>(
      `count(*[_type == "lead" && status == "converted" && convertedDate >= $startDate && convertedDate < $endDate])`,
      { startDate: sixtyDaysAgoISO, endDate: thirtyDaysAgoISO }
    )

    // Top destinations
    const destinationsData = await client.fetch<Array<{ destination: string; count: number }>>(
      `*[_type == "lead" && defined(destination)] | {
        "destination": destination,
        "count": count(*[_type == "lead" && destination == ^.destination])
      } | order(count desc) [0...8]`
    )

    // Get destination details (names and flags)
    const destinations = await client.fetch<Array<{ code: string; name: string; flag: string }>>(
      `*[_type == "destination"]{ code, name, flag }`
    )

    const destinationMap = new Map(destinations.map((d) => [d.code, d]))

    const topDestinations = destinationsData.map((item) => {
      const dest = destinationMap.get(item.destination)
      return {
        name: dest?.name || item.destination,
        count: item.count,
        flag: dest?.flag,
      }
    })

    // Calculate trends
    const calculateTrend = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0
      return Math.round(((current - previous) / previous) * 100)
    }

    return {
      totalLeads,
      totalLeadsTrend: calculateTrend(totalLeads, totalLeads7dAgo),
      newLeads7d,
      newLeads7dTrend: calculateTrend(newLeads7d, newLeads14d),
      meetings7d,
      meetings7dTrend: calculateTrend(meetings7d, meetings14d),
      converted30d,
      converted30dTrend: calculateTrend(converted30d, converted60d),
      topDestinations,
    }
  } catch (error) {
    console.error('Error fetching overview stats:', error)
    return {
      totalLeads: 0,
      totalLeadsTrend: 0,
      newLeads7d: 0,
      newLeads7dTrend: 0,
      meetings7d: 0,
      meetings7dTrend: 0,
      converted30d: 0,
      converted30dTrend: 0,
      topDestinations: [],
    }
  }
}

// Get all leads with optional filters
export async function getLeads(params?: {
  status?: string
  assignedTo?: string
  destination?: string
  search?: string
}) {
  let query = `*[_type == "lead"`
  const queryParams: Record<string, string> = {}

  if (params?.status) {
    query += ` && status == $status`
    queryParams.status = params.status
  }

  if (params?.assignedTo) {
    query += ` && assignedTo == $assignedTo`
    queryParams.assignedTo = params.assignedTo
  }

  if (params?.destination) {
    query += ` && destination == $destination`
    queryParams.destination = params.destination
  }

  if (params?.search) {
    query += ` && (firstName match $search || lastName match $search || email match $search || phone match $search)`
    queryParams.search = `*${params.search}*`
  }

  query += `] | order(_createdAt desc)`

  try {
    const leads = await client.fetch(query, queryParams)
    return leads
  } catch (error) {
    console.error('Error fetching leads:', error)
    return []
  }
}

// Get documents with optional lead filter
export async function getDocuments(leadId?: string) {
  const query = leadId
    ? `*[_type == "studentDocument" && leadId._ref == $leadId] | order(_createdAt desc)`
    : `*[_type == "studentDocument"] | order(_createdAt desc)`

  try {
    const documents = await client.fetch(query, leadId ? { leadId } : {})
    return documents
  } catch (error) {
    console.error('Error fetching documents:', error)
    return []
  }
}

// Get all destinations
export async function getDestinations() {
  try {
    const destinations = await client.fetch(
      `*[_type == "destination"] | order(order asc, name asc)`
    )
    return destinations
  } catch (error) {
    console.error('Error fetching destinations:', error)
    return []
  }
}

// Get team members
export async function getTeamMembers() {
  try {
    const team = await client.fetch(
      `*[_type == "teamMember" && isActive == true] | order(name asc)`
    )
    return team
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}
