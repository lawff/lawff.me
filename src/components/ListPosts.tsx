import r from '../blogIndex.json'
import NavLink from './NavLink'

export interface Post {
  path: string
  title: string
  date: string
  lang?: string
  desc?: string
  platform?: string
  duration?: string
}

const ListPosts = () => {
  return (
    <ul>

      { r?.routes?.length > 0
        ? (
          <>
            {
              r.routes.map((route) => {
                if (route.index) return null
                return (
                  <div key={route.path} className="mb-4 mt-2 op-60 hover:op-100">
                    <NavLink href={route.path} classes="inline-block">
                      <li className="no-underline py-0.5em inline">
                        <div className="title text-lg">
                          { route.title }
                        </div>

                        <div className="time opacity-50 text-sm -mt-1">
                          { route.date }
                          <span className="op80">· { route.readingTime }</span>
                        </div>
                      </li>
                    </NavLink>
                  </div>
                )
              })
            }
          </>
        )
        : (
          <div className="py2 op50">
        nothing here yet
          </div>
        )}
    </ul>
  )
}

export default ListPosts
