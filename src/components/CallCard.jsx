import { Phone, Mail, Building2, User2, CircleDot, Tag } from 'lucide-react'

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Icon className="w-4 h-4 text-gray-400"/>
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="truncate">{value}</span>
    </div>
  )
}

function Badge({ children, color='blue' }) {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  }
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${styles[color]}`}>{children}</span>
}

const categoryColor = (category) => ({
  'Structural': 'purple',
  'Civil': 'green',
  'Geotechnical': 'amber',
  'New Enquiry': 'blue',
  'Other': 'gray',
}[category] || 'gray')

function CallCard({ call }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <Badge color={categoryColor(call.category)}>
              <CircleDot className="w-3 h-3" />
              {call.category}
            </Badge>
            {call.priority && (
              <Badge color={call.priority === 'high' ? 'red' : call.priority === 'low' ? 'gray' : 'amber'}>
                <Tag className="w-3 h-3"/> {call.priority}
              </Badge>
            )}
            {call.status && (
              <Badge color={call.status === 'closed' ? 'gray' : call.status === 'in_progress' ? 'amber' : 'blue'}>
                {call.status}
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{call.subject || 'No subject provided'}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{call.message || '—'}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
            <InfoRow icon={User2} label="Caller" value={call.caller_name} />
            <InfoRow icon={Phone} label="Phone" value={call.phone} />
            <InfoRow icon={Mail} label="Email" value={call.email} />
            <InfoRow icon={Building2} label="Company" value={call.company} />
          </div>
        </div>
        <div className="text-right text-xs text-gray-500 whitespace-nowrap">
          {call.created_at ? new Date(call.created_at).toLocaleString() : ''}
        </div>
      </div>
    </div>
  )
}

export default CallCard
