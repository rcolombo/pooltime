//
//  MyPicksController
//  pooltime
//
//  Created by Joe Zirilli on 1/27/15.
//  Copyright (c) 2015 JoCoCo. All rights reserved.
//

import UIKit

class MyPicksController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var games: Array<Game>?
    @IBOutlet weak var picksTableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        picksService.getGamesForWeek(1) {(games) in
            self.games = games
            self.picksTableView.reloadData()
        }
        let nib = UINib(nibName: "MyPicksTableViewCell", bundle: nil)
        picksTableView.registerNib(nib, forCellReuseIdentifier: "myPicksCell")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if let count = games?.count {
            return count
        } else {
            return 0
        }
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        if let game: Game = self.games?[indexPath.row] {
            if let cell = self.picksTableView.dequeueReusableCellWithIdentifier("myPicksCell") as? MyPicksTableViewCell {
                cell.loadFromGame(game)
                return cell
            }
        }
        return UITableViewCell(style: UITableViewCellStyle.Default, reuseIdentifier: "myPicksCell")
    }

}

