insert into storage.buckets (
  id,
  name,
  public
)
values (
  'answer-images',
  'answer-images',
  false
)
on conflict (id)
do nothing;
