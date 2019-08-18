---
title: Keeping Multiple iTunes Libraries in Sync
permalink: /keeping-multiple-itunes-libraries-in-sync/
---

My wife and I both have laptops.  For several reasons we decided to use iTunes on both computers to manage our music library, most notably because of its ability to stream music to other rooms using the cool <a href="http://www.apple.com/airportexpress/" target="_blank">Airport Express</a> device.  Our library is common meaning we have a big pile of music that we both want to be able to listen to from each of our own computers.

Over the last few years I&#8217;ve tried several techniques including use of the tool called  <a href="http://itlu.ownz.ch/wordpress/" target="_blank">iTunes Library Updater</a> but was not happy with any of them.  I eyed a well reviewed tool called <a href="http://www.acertant.com/web/tuneranger/" target="_blank">TuneRanger</a> but because of its pricing structure and our multi-platform environment (my wife has a Mac and I have a PC) we would have to buy two fairly expensive licenses.

Anyway, I finally figured out a free, fairly painless way to keep them in sync.  Although this is a manual process it works great and isn&#8217;t terribly complicated.

1. **Sync the  Music Files** &#8211; First off, you need a way for all the computers to actually access the underlying music files.  I used to use <a href="https://www.mesh.com" target="_blank">Live Mesh</a> (very similar to <a href="https://www.dropbox.com/" target="_blank">DropBox</a>) to sync the files across the computers but have since added a NAS (network drive) to our home network so I now simply point both computers to one of its shares called &#8220;Music&#8221; to access the files.
2. **Update the iTunes Libraries &#8211;** Now you need to update each computer&#8217;s iTunes library so that it knows about newly added songs (i.e. new purchases from the iTunes Store) and removes songs which have been deleted from other computers.  Follow these 2 steps on each computer every once in awhile.

   1. **Add New Music**- To get iTunes to add new music, open your file explorer (Windows Explorer in Windows or Finder on a Mac) and locate the music folder where all the underlying files are.  Drag and drop this folder into the iTunes &#8220;Library&#8221; area on the top left side of the window.  iTunes will then search and add any files that aren&#8217;t already in the library.  _Easy._

   <img class="size-full wp-image-50" title="iTunes Library" src="itunes_library.png" alt="" width="206" height="151" />

   <p class="wp-caption-text">
     Drag/Drop your Music onto the iTunes &#8220;Library&#8221; area
   </p>

   1. **Remove Deleted Music**- This is trickier.  Create a *regular *playlist (not a Smart Playlist!) called &#8220;Not Missing&#8221;.  Drag and drop your (Library -> Music) item onto this new playlist.  iTunes will only add songs to this playlist which actually exist in the file system.  Now create a *Smart *playlist called &#8220;Missing&#8221;.  Add a rule that says &#8220;Playlist is not &#8216;Not Missing&#8221;.

   <img class=" alignnone" title="itunes_playlist_missing" src="itunes_playlist.png" alt="iTunes Smart Playlist" />

   1. Now, this new &#8220;Missing&#8221; smart playlist will contain songs that exist in your iTunes library that don&#8217;t have an underlying file, meaning they have been deleted.  So, find these songs in iTunes and delete their entries.

Ok, so it takes a little work but it&#8217;s not that bad.  Just go through this process every once in awhile on each of the computers and you&#8217;ll be in sync!  In an ideal world, Apple will add a feature to iTunes to automate all of this but until then&#8230;
