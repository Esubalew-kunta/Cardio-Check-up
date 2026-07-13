// Shared YouTube embed for an exam's explainer clip, used by both the
// single-exam template (ExamDetail.jsx) and the multi-exam hub (ExamHub.jsx).
// Shows a placeholder until a real videoId is supplied.
export default function ExamVideo({ videoId, name }) {
  if (videoId) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&hl=fr&cc_load_policy=1&cc_lang_pref=fr`}
          title={`Vidéo explicative : ${name}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    )
  }
  return (
    <div className="aspect-video grid place-items-center rounded-xl bg-burgundy-deep shadow-lg">
      <div className="flex flex-col items-center text-center px-6">
        <span className="grid place-items-center h-16 w-16 rounded-full border-2 border-gold/70">
          <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-0.5 fill-gold" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <p className="mt-4 text-sm font-medium text-offwhite/80">Voir la vidéo explicative</p>
      </div>
    </div>
  )
}
