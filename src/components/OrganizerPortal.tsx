import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Users, 
  UserCheck, 
  UserX, 
  Download, 
  Search, 
  RefreshCw, 
  Utensils, 
  Music, 
  Shield,
  Lock,
  Unlock,
  AlertCircle
} from 'lucide-react';
import { RSVPData } from '../types';
import { fetchRSVPs } from '../lib/supabase';

interface OrganizerPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrganizerPortal: React.FC<OrganizerPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'yes' | 'no'>('all');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'BR2027') {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchRSVPs();
      setRsvps(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // Summary Metrics
  const totalAttendingGuests = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

  const totalAcceptedParties = rsvps.filter(r => r.attending === 'yes').length;
  const totalDeclinedParties = rsvps.filter(r => r.attending === 'no').length;

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch = 
      r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.email && r.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.phone && r.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.dietary_restrictions && r.dietary_restrictions.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.song_request && r.song_request.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || r.attending === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Full Name', 'Attending', 'Guest Count', 'Phone', 'Email', 'Dietary Restrictions', 'Song Request', 'Message', 'Submission Date'];
    const rows = rsvps.map(r => [
      `"${r.full_name.replace(/"/g, '""')}"`,
      r.attending === 'yes' ? 'Yes' : 'No',
      r.attending === 'yes' ? r.guest_count : 0,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.dietary_restrictions || '').replace(/"/g, '""')}"`,
      `"${(r.song_request || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.created_at ? new Date(r.created_at).toLocaleDateString() : ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bandar_Rahaf_Wedding_RSVPs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="organizer-portal-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            className="relative w-full max-w-md bg-[#FCFAF6] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-auto p-6 sm:p-8 text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-[#7B6A58] hover:text-[#16397C] hover:bg-[#16397C]/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-[#16397C]/10 text-[#16397C] flex items-center justify-center mx-auto mb-4 border border-[#16397C]/20 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-wedding-serif text-2xl text-[#2C2724] font-medium mb-1">
              Organizer Access
            </h3>
            <p className="font-wedding-sans text-xs text-[#7B6A58] mb-6">
              Please enter the organizer password to access the wedding guest dashboard and RSVP data.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError(false);
                  }}
                  placeholder="Enter Password"
                  autoFocus
                  className={`w-full px-4 py-3 text-center rounded-xl border font-mono tracking-widest text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
                    passwordError 
                      ? 'border-rose-400 focus:ring-rose-300 text-rose-800' 
                      : 'border-[#E8DFC8] focus:ring-[#16397C]/30 focus:border-[#16397C] text-[#2C2724]'
                  }`}
                />
                {passwordError && (
                  <p className="text-xs text-rose-600 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect password. Please try again.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#16397C] hover:bg-[#0F2857] text-white font-cinzel text-xs tracking-[0.2em] uppercase font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Unlock Portal</span>
                <Unlock className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-5xl bg-[#FCFAF6] rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden my-auto max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#16397C] text-white flex items-center justify-between border-b border-[#2C4F94]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#E5C378]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg font-semibold tracking-wider">
                    Organizer Portal &amp; RSVP Manager
                  </h3>
                  <p className="font-wedding-sans text-xs text-[#E8DFC8]/80">
                    Bandar Al Qatarneh &amp; Rahaf Abuaisheh Wedding
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* RSVP List & Dashboard Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-cinzel text-[11px] uppercase tracking-wider text-[#7B6A58]">
                      Confirmed Guests
                    </p>
                    <p className="font-wedding-serif text-2xl font-bold text-[#16397C]">
                      {totalAttendingGuests} <span className="text-xs font-sans font-normal text-[#7B6A58]">({totalAcceptedParties} parties)</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-cinzel text-[11px] uppercase tracking-wider text-[#7B6A58]">
                      Total Responses
                    </p>
                    <p className="font-wedding-serif text-2xl font-bold text-[#2C2724]">
                      {rsvps.length}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <UserX className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-cinzel text-[11px] uppercase tracking-wider text-[#7B6A58]">
                      Declined
                    </p>
                    <p className="font-wedding-serif text-2xl font-bold text-[#7B6A58]">
                      {totalDeclinedParties}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#9E9488] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:ring-1 focus:ring-[#16397C]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e: any) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-white text-[#2C2724] font-cinzel focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Responses</option>
                    <option value="yes">Attending Only</option>
                    <option value="no">Declined Only</option>
                  </select>

                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="p-2 rounded-xl border border-[#E8DFC8] bg-white text-[#5C534A] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 rounded-xl bg-[#16397C] text-white hover:bg-[#0F2857] font-cinzel text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* RSVPs Table / Cards */}
              <div className="bg-white rounded-xl border border-[#E8DFC8] overflow-hidden shadow-2xs">
                {filteredRsvps.length === 0 ? (
                  <div className="p-12 text-center text-[#7B6A58]">
                    <p className="font-wedding-serif text-xl">No RSVP responses match your filter.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF7F2] border-b border-[#E8DFC8] font-cinzel text-[#7B6A58] uppercase tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 font-semibold">Guest</th>
                          <th className="py-3.5 px-4 font-semibold">Status</th>
                          <th className="py-3.5 px-4 font-semibold">Count</th>
                          <th className="py-3.5 px-4 font-semibold">Dietary &amp; Music</th>
                          <th className="py-3.5 px-4 font-semibold">Personal Note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8DFC8]/60">
                        {filteredRsvps.map((rsvp, idx) => (
                          <tr key={rsvp.id || idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                            <td className="py-3.5 px-4">
                              <p className="font-semibold text-sm text-[#2C2724]">{rsvp.full_name}</p>
                              <p className="text-[11px] text-[#7B6A58]">{rsvp.phone || rsvp.email || 'No contact provided'}</p>
                            </td>
                            <td className="py-3.5 px-4">
                              {rsvp.attending === 'yes' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
                                  <UserCheck className="w-3 h-3" /> Attending
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 font-semibold border border-stone-300 text-[11px]">
                                  <UserX className="w-3 h-3" /> Declined
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-wedding-serif text-base text-[#16397C] font-semibold">
                              {rsvp.attending === 'yes' ? `${rsvp.guest_count} guest${rsvp.guest_count > 1 ? 's' : ''}` : '-'}
                            </td>
                            <td className="py-3.5 px-4 max-w-xs space-y-1">
                              {rsvp.dietary_restrictions && (
                                <p className="text-[11px] text-[#5C534A] flex items-center gap-1">
                                  <Utensils className="w-3 h-3 text-[#C5A059] shrink-0" />
                                  <span className="truncate">{rsvp.dietary_restrictions}</span>
                                </p>
                              )}
                              {rsvp.song_request && (
                                <p className="text-[11px] text-[#16397C] flex items-center gap-1">
                                  <Music className="w-3 h-3 text-[#16397C] shrink-0" />
                                  <span className="truncate italic">"{rsvp.song_request}"</span>
                                </p>
                              )}
                              {!rsvp.dietary_restrictions && !rsvp.song_request && (
                                <span className="text-gray-400 italic">None</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              {rsvp.message ? (
                                <p className="text-[11px] text-[#4A423A] line-clamp-2 italic">
                                  "{rsvp.message}"
                                </p>
                              ) : (
                                <span className="text-gray-400 italic">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E8DFC8] flex items-center justify-between text-xs text-[#7B6A58]">
              <span>EverAfter Invites RSVP Engine</span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white border border-[#E8DFC8] hover:bg-[#F5EFE4] text-[#2C2724] font-cinzel uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};