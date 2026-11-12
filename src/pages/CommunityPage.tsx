import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDemoData } from '../context/DemoDataContext';
import { useToast } from '../context/ToastContext';
import { moderateCommunityText } from '../utils/institutionRules';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Send,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Lock,
  User,
  Filter,
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { student, admin, role } = useAuth();
  const { communityPosts, addCommunityPost, likeCommunityPost, replyToCommunityPost } = useDemoData();
  const { showToast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [contentInput, setContentInput] = useState('');
  const [postSubject, setPostSubject] = useState('Physics');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'General Discussion'];

  const filteredPosts = communityPosts.filter(
    (p) => selectedSubject === 'All' || p.subject === selectedSubject
  );

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const moderation = moderateCommunityText(contentInput);
    if (!moderation.allowed) {
      showToast({
        type: 'error',
        title: 'Community Rule Violation',
        message: moderation.reason || 'Content rejected by automated moderation filter.',
      });
      return;
    }

    const authorName = isAnonymous
      ? 'Anonymous Peer'
      : student?.name || admin?.name || 'Portal Scholar';

    addCommunityPost({
      subject: postSubject,
      authorName,
      isAnonymous,
      authorStudentId: student?.id,
      content: contentInput.trim(),
    });

    showToast({
      type: 'success',
      title: 'Question Published',
      message: `Posted to #${postSubject} channel`,
    });

    setContentInput('');
  };

  const handleReplySubmit = (postId: string) => {
    const text = replyInput[postId];
    if (!text || !text.trim()) return;

    const moderation = moderateCommunityText(text);
    if (!moderation.allowed) {
      showToast({
        type: 'error',
        title: 'Reply Moderation Notice',
        message: moderation.reason || 'Phone numbers and external links are prohibited.',
      });
      return;
    }

    const authorName = isAnonymous
      ? 'Anonymous Peer'
      : student?.name || admin?.name || 'Practical Centre Student';

    replyToCommunityPost(postId, {
      authorName,
      isAnonymous,
      content: text.trim(),
    });

    showToast({
      type: 'success',
      title: 'Reply Posted',
      message: 'Your explanation has been added to the discussion.',
    });

    setReplyInput((prev) => ({ ...prev, [postId]: '' }));
    setActiveReplyId(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-900" />
            Subject-Scoped Academic Peer Forum
          </h1>
          <p className="text-xs text-slate-500">
            Collaborative doubt clearing for Sindh Board preparation. Strictly moderated for student safety.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Phone & Link Spam Filter Active</span>
        </div>
      </div>

      {/* Channel Subject Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {subjects.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setSelectedSubject(sub)}
            className={`px-4 py-2 rounded-xl font-bold transition-all border shrink-0 ${
              selectedSubject === sub
                ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            #{sub}
          </button>
        ))}
      </div>

      {/* New Question Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Ask an Academic Question / Start Discussion
        </h3>

        <form onSubmit={handlePostSubmit} className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">Channel:</span>
              <select
                value={postSubject}
                onChange={(e) => setPostSubject(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-blue-900"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="General Discussion">General Discussion</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 ml-auto">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-600 w-4 h-4"
              />
              <span>Post as "Anonymous Peer"</span>
            </label>
          </div>

          <textarea
            required
            rows={3}
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            placeholder="Type your question or conceptual doubt here (e.g. Can someone clarify the derivation for electric potential energy?)..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 leading-relaxed text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-slate-400">
              Note: Contact numbers, social handles, and external hyperlinks are strictly blocked.
            </p>
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Post Question
            </button>
          </div>
        </form>
      </div>

      {/* Discussion Threads Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  {post.isAnonymous ? '?' : post.authorName.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-900">{post.authorName}</span>
                  <span className="text-[11px] text-slate-400 font-mono ml-2">{post.timestamp}</span>
                </div>
              </div>

              <span className="font-mono text-[10px] font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                #{post.subject}
              </span>
            </div>

            <p className="text-slate-800 text-sm leading-relaxed">{post.content}</p>

            {/* Post Actions: Like, Reply */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-slate-500 font-semibold">
              <button
                type="button"
                onClick={() => likeCommunityPost(post.id)}
                className="hover:text-blue-900 flex items-center gap-1.5 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} Helpful</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveReplyId(activeReplyId === post.id ? null : post.id)
                }
                className="hover:text-blue-900 flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{post.replies.length} Replies</span>
              </button>
            </div>

            {/* Replies List */}
            {post.replies.length > 0 && (
              <div className="pl-6 border-l-2 border-slate-200 space-y-3 pt-2">
                {post.replies.map((rep) => (
                  <div key={rep.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900">{rep.authorName}</span>
                      <span className="font-mono text-slate-400">{rep.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{rep.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {activeReplyId === post.id && (
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={replyInput[post.id] || ''}
                  onChange={(e) =>
                    setReplyInput({ ...replyInput, [post.id]: e.target.value })
                  }
                  placeholder="Provide an explanation or formula derivation..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleReplySubmit(post.id)}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
